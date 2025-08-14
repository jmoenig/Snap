import {Emitter} from "./events.js"
import * as Types from "./types.js"

// Polyfill
import {Buffer} from "./buffer-es6/index.js"
world.Buffer = Buffer;
// Internal Dependencies
import Encoder7Bit from "./encoder7bit.js"
import OneWire from "./onewireutils.js"

// Program specifics
const i2cActive = new Map();

export const TYPES = Types
/**
 * constants
 */

const ANALOG_MAPPING_QUERY = 0x69;
const ANALOG_MAPPING_RESPONSE = 0x6A;
const ANALOG_MESSAGE = 0xE0;
const CAPABILITY_QUERY = 0x6B;
const CAPABILITY_RESPONSE = 0x6C;
const DIGITAL_MESSAGE = 0x90;
const END_SYSEX = 0xF7;
const EXTENDED_ANALOG = 0x6F;
const I2C_CONFIG = 0x78;
const I2C_REPLY = 0x77;
const I2C_REQUEST = 0x76;
const I2C_READ_MASK = 0x18;   // 0b00011000
// const I2C_END_TX_MASK = 0x40; // 0b01000000
const ONEWIRE_CONFIG_REQUEST = 0x41;
const ONEWIRE_DATA = 0x73;
const ONEWIRE_DELAY_REQUEST_BIT = 0x10;
const ONEWIRE_READ_REPLY = 0x43;
const ONEWIRE_READ_REQUEST_BIT = 0x08;
const ONEWIRE_RESET_REQUEST_BIT = 0x01;
const ONEWIRE_SEARCH_ALARMS_REPLY = 0x45;
const ONEWIRE_SEARCH_ALARMS_REQUEST = 0x44;
const ONEWIRE_SEARCH_REPLY = 0x42;
const ONEWIRE_SEARCH_REQUEST = 0x40;
const ONEWIRE_WITHDATA_REQUEST_BITS = 0x3C;
const ONEWIRE_WRITE_REQUEST_BIT = 0x20;
const PIN_MODE = 0xF4;
const PIN_STATE_QUERY = 0x6D;
const PIN_STATE_RESPONSE = 0x6E;
const PING_READ = 0x75;
// const PULSE_IN = 0x74;
// const PULSE_OUT = 0x73;
const QUERY_FIRMWARE = 0x79;
const REPORT_ANALOG = 0xC0;
const REPORT_DIGITAL = 0xD0;
const REPORT_VERSION = 0xF9;
const SAMPLING_INTERVAL = 0x7A;
const SERVO_CONFIG = 0x70;
const SERIAL_MESSAGE = 0x60;
const SERIAL_CONFIG = 0x10;
const SERIAL_WRITE = 0x20;
const SERIAL_READ = 0x30;
const SERIAL_REPLY = 0x40;
const SERIAL_CLOSE = 0x50;
const SERIAL_FLUSH = 0x60;
const SERIAL_LISTEN = 0x70;
const START_SYSEX = 0xF0;
const STEPPER = 0x72;
const ACCELSTEPPER = 0x62;
const STRING_DATA = 0x71;
const SYSTEM_RESET = 0xFF;

const MAX_PIN_COUNT = 128;

const SYM_sendOneWireSearch = Symbol("sendOneWireSearch");
const SYM_sendOneWireRequest = Symbol("sendOneWireRequest");

/**
 * MIDI_RESPONSE contains functions to be called when we receive a MIDI message from the arduino.
 * used as a switch object as seen here http://james.padolsey.com/javascript/how-to-avoid-switch-case-syndrome/
 * @private
 */

const MIDI_RESPONSE = {

  /**
   * Handles a REPORT_VERSION response and emits the reportversion event.
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [REPORT_VERSION](board) {
    board.version.major = board.buffer[1];
    board.version.minor = board.buffer[2];
    board.emit("reportversion");
  },

  /**
   * Handles a ANALOG_MESSAGE response and emits "analog-read" and "analog-read-"+n events where n is the pin number.
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [ANALOG_MESSAGE](board) {
    const pin = board.buffer[0] & 0x0F;
    const value = board.buffer[1] | (board.buffer[2] << 7);

    if (board.pins[board.analogPins[pin]]) {
      board.pins[board.analogPins[pin]].value = value;
    }

    board.emit(`analog-read-${pin}`, value);
    board.emit("analog-read", {
      pin,
      value,
    });
  },

  /**
   * Handles a DIGITAL_MESSAGE response and emits:
   * "digital-read"
   * "digital-read-"+n
   *
   * Where n is the pin number.
   *
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [DIGITAL_MESSAGE](board) {
    const port = board.buffer[0] & 0x0F;
    const portValue = board.buffer[1] | (board.buffer[2] << 7);

    for (let i = 0; i < 8; i++) {
      const pin = 8 * port + i;
      const pinRec = board.pins[pin];
      const bit = 1 << i;

      if (pinRec && (pinRec.mode === board.MODES.INPUT || pinRec.mode === board.MODES.PULLUP)) {
        pinRec.value = (portValue >> (i & 0x07)) & 0x01;

        if (pinRec.value) {
          board.ports[port] |= bit;
        } else {
          board.ports[port] &= ~bit;
        }

        let {value} = pinRec;

        board.emit(`digital-read-${pin}`, value);
        board.emit("digital-read", {
          pin,
          value,
        });
      }
    }
  },
};

/**
 * SYSEX_RESPONSE contains functions to be called when we receive a SYSEX message from the arduino.
 * used as a switch object as seen here http://james.padolsey.com/javascript/how-to-avoid-switch-case-syndrome/
 * @private
 */

const SYSEX_RESPONSE = {

  /**
   * Handles a QUERY_FIRMWARE response and emits the "queryfirmware" event
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [QUERY_FIRMWARE](board) {
    const length = board.buffer.length - 2;
    const buffer = Buffer.alloc(Math.round((length - 4) / 2));
    let byte = 0;
    let offset = 0;

    for (let i = 4; i < length; i += 2) {
      byte = ((board.buffer[i] & 0x7F) | ((board.buffer[i + 1] & 0x7F) << 7)) & 0xFF;
      buffer.writeUInt8(byte, offset++);
    }

    board.firmware = {
      name: buffer.toString(),
      version: {
        major: board.buffer[2],
        minor: board.buffer[3],
      },
    },

    board.emit("queryfirmware");
  },

  /**
   * Handles a CAPABILITY_RESPONSE response and emits the "capability-query" event
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [CAPABILITY_RESPONSE](board) {
    const modes = Object.keys(board.MODES).map((key) => board.MODES[key]);
    let mode, resolution;
    let capability = 0;

    function supportedModes(capability) {
      return modes.reduce((accum, mode) => {
        if (capability & (1 << mode)) {
          accum.push(mode);
        }
        return accum;
      }, []);
    }

    // Only create pins if none have been previously created on the instance.
    if (!board.pins.length) {
      for (let i = 2, n = 0; i < board.buffer.length - 1; i++) {
        if (board.buffer[i] === 0x7F) {
          board.pins.push({
            supportedModes: supportedModes(capability),
            mode: undefined,
            value: 0,
            report: 1,
          });
          capability = 0;
          n = 0;
          continue;
        }
        if (n === 0) {
          mode = board.buffer[i];
          resolution = (1 << board.buffer[i + 1]) - 1;
          capability |= (1 << mode);

          // ADC Resolution of Analog Inputs
          if (mode === board.MODES.ANALOG && board.RESOLUTION.ADC === null) {
            board.RESOLUTION.ADC = resolution;
          }

          // PWM Resolution of PWM Outputs
          if (mode === board.MODES.PWM && board.RESOLUTION.PWM === null) {
            board.RESOLUTION.PWM = resolution;
          }

          // DAC Resolution of DAC Outputs
          // if (mode === board.MODES.DAC && board.RESOLUTION.DAC === null) {
          //   board.RESOLUTION.DAC = resolution;
          // }
        }
        n ^= 1;
      }
    }

    board.emit("capability-query");
  },

  /**
   * Handles a PIN_STATE response and emits the 'pin-state-'+n event where n is the pin number.
   *
   * Note about pin state: For output modes, the state is any value that has been
   * previously written to the pin. For input modes, the state is the status of
   * the pullup resistor.
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [PIN_STATE_RESPONSE](board) {
    let pin = board.buffer[2];
    board.pins[pin].mode = board.buffer[3];
    board.pins[pin].state = board.buffer[4];
    if (board.buffer.length > 6) {
      board.pins[pin].state |= (board.buffer[5] << 7);
    }
    if (board.buffer.length > 7) {
      board.pins[pin].state |= (board.buffer[6] << 14);
    }
    board.emit(`pin-state-${pin}`);
  },

  /**
   * Handles a ANALOG_MAPPING_RESPONSE response and emits the "analog-mapping-query" event.
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [ANALOG_MAPPING_RESPONSE](board) {
    let pin = 0;
    let currentValue;
    for (let i = 2; i < board.buffer.length - 1; i++) {
      currentValue = board.buffer[i];
      board.pins[pin].analogChannel = currentValue;
      if (currentValue !== 127) {
        board.analogPins.push(pin);
      }
      pin++;
    }
    board.emit("analog-mapping-query");
  },

  /**
   * Handles a I2C_REPLY response and emits the "I2C-reply-"+n event where n is the slave address of the I2C device.
   * The event is passed the buffer of data sent from the I2C Device
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [I2C_REPLY](board) {
    const reply = [];
    const address = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    const register = (board.buffer[4] & 0x7F) | ((board.buffer[5] & 0x7F) << 7);

    for (let i = 6, length = board.buffer.length - 1; i < length; i += 2) {
      reply.push(board.buffer[i] | (board.buffer[i + 1] << 7));
    }

    board.emit(`I2C-reply-${address}-${register}`, reply);
  },

  [ONEWIRE_DATA](board) {
    const subCommand = board.buffer[2];

    if (!SYSEX_RESPONSE[subCommand]) {
      return;
    }

    SYSEX_RESPONSE[subCommand](board);
  },

  [ONEWIRE_SEARCH_REPLY](board) {
    const pin = board.buffer[3];
    const buffer = board.buffer.slice(4, board.buffer.length - 1);

    board.emit(`1-wire-search-reply-${pin}`, OneWire.readDevices(buffer));
  },

  [ONEWIRE_SEARCH_ALARMS_REPLY](board) {
    const pin = board.buffer[3];
    const buffer = board.buffer.slice(4, board.buffer.length - 1);

    board.emit(`1-wire-search-alarms-reply-${pin}`, OneWire.readDevices(buffer));
  },

  [ONEWIRE_READ_REPLY](board) {
    const encoded = board.buffer.slice(4, board.buffer.length - 1);
    const decoded = Encoder7Bit.from7BitArray(encoded);
    const correlationId = (decoded[1] << 8) | decoded[0];

    board.emit(`1-wire-read-reply-${correlationId}`, decoded.slice(2));
  },

  /**
   * Handles a STRING_DATA response and logs the string to the console.
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [STRING_DATA](board) {
    board.emit("string", Buffer.from(board.buffer.slice(2, -1)).toString().replace(/\0/g, ""));
  },

  /**
   * Response from pingRead
   */

  [PING_READ](board) {
    const pin = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    const durationBuffer = [
      (board.buffer[4] & 0x7F) | ((board.buffer[5] & 0x7F) << 7),
      (board.buffer[6] & 0x7F) | ((board.buffer[7] & 0x7F) << 7),
      (board.buffer[8] & 0x7F) | ((board.buffer[9] & 0x7F) << 7),
      (board.buffer[10] & 0x7F) | ((board.buffer[11] & 0x7F) << 7),
    ];
    const duration = ((durationBuffer[0] << 24) +
      (durationBuffer[1] << 16) +
      (durationBuffer[2] << 8) +
      (durationBuffer[3]));
    board.emit(`ping-read-${pin}`, duration);
  },

  /**
   * Handles the message from a stepper completing move
   * @param {Board} board
   */

  [STEPPER](board) {
    const deviceNum = board.buffer[2];
    board.emit(`stepper-done-${deviceNum}`, true);
  },

  /**
   * Handles the message from a stepper or group of steppers completing move
   * @param {Board} board
   */

  [ACCELSTEPPER](board) {
    const command = board.buffer[2];
    const deviceNum = board.buffer[3];
    const value = command === 0x06 || command === 0x0A ?
      decode32BitSignedInteger(board.buffer.slice(4, 9)) : null;

    if (command === 0x06) {
      board.emit(`stepper-position-${deviceNum}`, value);
    }
    if (command === 0x0A) {
      board.emit(`stepper-done-${deviceNum}`, value);
    }
    if (command === 0x24) {
      board.emit(`multi-stepper-done-${deviceNum}`);
    }
  },

  /**
   * Handles a SERIAL_REPLY response and emits the "serial-data-"+n event where n is the id of the
   * serial port.
   * The event is passed the buffer of data sent from the serial device
   * @private
   * @param {Board} board the current arduino board we are working with.
   */

  [SERIAL_MESSAGE](board) {
    const command = board.buffer[2] & START_SYSEX;
    const portId = board.buffer[2] & 0x0F;
    const reply = [];

    if (command === SERIAL_REPLY) {
      for (let i = 3, len = board.buffer.length; i < len - 1; i += 2) {
        reply.push((board.buffer[i + 1] << 7) | board.buffer[i]);
      }
      board.emit(`serial-data-${portId}`, reply);
    }
  },

/**
 * SA5Firmata SYSEX_RESPONSE definitions
 * Including this into firmata.js because chromium operation
 */

//joyX Nunchuk
  [0xC0](board) {
    var value = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    board.emit('joyX', value);
  },

//joyY Nunchuk
  [0xC1](board) {
    var value = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    board.emit('joyY', value);
  },

//butZ Nunchuk
  [0xC2](board) {
    var value = (board.buffer[2] & 0x7F);
    board.emit('butZ', value);
  },

//butC Nunchuk
  [0xC3](board) {
    var value = (board.buffer[2] & 0x7F);
    board.emit('butC', value);
  },

//accX Nunchuk
  [0xC4](board) {
    var value = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    board.emit('accX', value);
  },

//accY Nunchuk
  [0xC5](board) {
    var value = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    board.emit('accY', value);
  },
  
//accZ Nunchuk
  [0xC6](board) {
    var value = (board.buffer[2] & 0x7F) | ((board.buffer[3] & 0x7F) << 7);
    board.emit('accZ', value);
  },

//pulseIn
  [0xC8](board) {
    const pulse = (board.buffer[2] & 0x7F) << 25| (board.buffer[3] & 0x7F) << 18 | (board.buffer[4] & 0x7F) << 11 | (board.buffer[5] & 0x7F) << 4 | (board.buffer[6] & 0x7F) >> 3;
    const pinResp = (board.buffer[6] & parseInt("0111",2)) << 5 | (board.buffer[7] & parseInt("011111",2));
    //board[`pulseIn-${pinResp}`] = pulse;
    board.emit(`pulseIn-${pinResp}`, pulse);
  },

//ping
  [0xCA](board) {
    var pulse = (board.buffer[2] & 0x7F) << 9| (board.buffer[3] & 0x7F) << 2 | (board.buffer[4] & parseInt("01100000",2)) >> 5;
    var pinResponse = (board.buffer[4] & parseInt("011111",2)) << 3 | (board.buffer[5] & parseInt("0111",2));
    board.emit('ping-' + pinResponse, pulse);
  },

//ir reporter
  [0xCB](board) {
    var irResult = (board.buffer[2] & 0x7F) << 25| (board.buffer[3] & 0x7F) << 18 | (board.buffer[4] & 0x7F) << 11 | (board.buffer[5] & 0x7F) << 4 | (board.buffer[6] & 0x7F) >> 3;
    irResult = irResult & 0xFFFFFF;
    board.emit('IRrec', irResult);
  },

//dht11
  [0xCF](board) {
    var response = (board.buffer[2] & 0x7F) << 1 | (board.buffer[3] & 0x01);
    var rpin = board.buffer[4] >> 1;
    var rparam = board.buffer[4] & parseInt("01",2);
    board.emit('DHT11-' + rpin + '-' + rparam, response);
  }
};
/**
 * @class The Board object represents an arduino board.
 * @augments Emitter
 * @param {String} port This is the serial port the arduino is connected to.
 * @param {function} function A function to be called when the arduino is ready to communicate.
 * @property MODES All the modes available for pins on this arduino board.
 * @property I2C_MODES All the I2C modes available.
 * @property SERIAL_MODES All the Serial modes available.
 * @property SERIAL_PORT_ID ID values to pass as the portId parameter when calling serialConfig.
 * @property HIGH A constant to set a pins value to HIGH when the pin is set to an output.
 * @property LOW A constant to set a pins value to LOW when the pin is set to an output.
 * @property pins An array of pin object literals.
 * @property analogPins An array of analog pins and their corresponding indexes in the pins array.
 * @property version An object indicating the major and minor version of the firmware currently running.
 * @property firmware An object indicating the name, major and minor version of the firmware currently running.
 * @property buffer An array holding the current bytes received from the arduino.
 * @property {SerialPort} sp The serial port object used to communicate with the arduino.
 */

export class Firmata extends Emitter {
  constructor(transport, options = {}, callback = (err) => {}) {
    super();

    const board = this;
    const defaults = {
      reportVersionTimeout: 5000,
      samplingInterval: 19,
      serialport: {
        baudRate: 57600,
        // https://github.com/node-serialport/node-serialport/blob/5.0.0/UPGRADE_GUIDE.md#open-options
        highWaterMark: 256,
      },
    };

    const settings = Object.assign({}, defaults, options);

    this.isReady = false;

    this.MODES = Types.MODES;

    this.I2C_MODES = {
      WRITE: 0,
      READ: 1,
      CONTINUOUS_READ: 2,
      STOP_READING: 3,
    };

    this.STEPPER = Types.STEPPER;

    this.SERIAL_MODES = {
      CONTINUOUS_READ: 0x00,
      STOP_READING: 0x01,
    };

    // ids for hardware and software serial ports on the board
    this.SERIAL_PORT_IDs = {
      HW_SERIAL0: 0x00,
      HW_SERIAL1: 0x01,
      HW_SERIAL2: 0x02,
      HW_SERIAL3: 0x03,
      SW_SERIAL0: 0x08,
      SW_SERIAL1: 0x09,
      SW_SERIAL2: 0x10,
      SW_SERIAL3: 0x11,

      // Default can be used by dependant libraries to key on a
      // single property name when negotiating ports.
      //
      // Firmata elects SW_SERIAL0: 0x08 as its DEFAULT
      DEFAULT: 0x08,
    };

    // map to the pin resolution value in the capability query response
    this.SERIAL_PIN_TYPES = {
      RES_RX0: 0x00,
      RES_TX0: 0x01,
      RES_RX1: 0x02,
      RES_TX1: 0x03,
      RES_RX2: 0x04,
      RES_TX2: 0x05,
      RES_RX3: 0x06,
      RES_TX3: 0x07,
    };

    this.RESOLUTION = {
      ADC: null,
      DAC: null,
      PWM: null,
    };

    this.HIGH = 1;
    this.LOW = 0;
    this.pins = [];
    this.ports = Array(16).fill(0);
    this.analogPins = [];
    this.version = {};
    this.firmware = {
      name:'',
      version: {}
    };
    this.buffer = [];
    this.versionReceived = false;
    this.name = "Firmata";
    this.settings = settings;
    this.pending = 0;
    this.digitalPortQueue = 0x0000;
    this.transport = transport;

    this.callback = callback

    if(this.transport) {
      this.connect()
    }
  }

  /**
   * NOTE: New function not in original 'firmata-io' library
   */
  get analogPinLookup() {
    const lookup = {}
    this.analogPins.forEach((value, index) => {
      lookup[value] = index
    })
    return lookup
  }

  /**
   * NOTE: New function not in original 'firmata-io' library
   * @param {*} pin 
   * @returns 
   */
  pinToAnalogPin (pin = 0) {
    return this.analogPinLookup[pin]
  }

  /**
   * Function to start the connection
   * NOTE: New function not in original 'firmata-io' library
   */
  connect() {
    const {callback, settings} = this

    this.transport.on("close", event => {

      // https://github.com/node-serialport/node-serialport/blob/5.0.0/UPGRADE_GUIDE.md#opening-and-closing
      if (event && event.disconnected) {
        this.emit("disconnect");
        return;
      }

      this.emit("close");
    });

    this.transport.on("open", event => {
      this.emit("open", event);
      // Legacy
      this.emit("connect", event);
    });

    this.transport.on("error", error => {
      if (!this.isReady && typeof callback === "function") {
        callback(error);
      } else {
        this.emit("error", error);
      }
    });

    this.transport.on("data", data => {
      for (let i = 0; i < data.length; i++) {
        let byte = data[i];
        // we dont want to push 0 as the first byte on our buffer
        if (this.buffer.length === 0 && byte === 0) {
          continue;
        }

        this.buffer.push(byte);

        let first = this.buffer[0];
        let last = this.buffer[this.buffer.length - 1];

        // [START_SYSEX, ... END_SYSEX]
        if (first === START_SYSEX && last === END_SYSEX) {

          let handler = SYSEX_RESPONSE[this.buffer[1]];

          // Ensure a valid SYSEX_RESPONSE handler exists
          // Only process these AFTER the REPORT_VERSION
          // message has been received and processed.
          if (handler && this.versionReceived) {
            handler(this);
          }

          // It is possible for the board to have
          // existing activity from a previous run
          // that will leave any of the following
          // active:
          //
          //    - ANALOG_MESSAGE
          //    - SERIAL_READ
          //    - I2C_REQUEST, CONTINUOUS_READ
          //
          // This means that we will receive these
          // messages on transport "open", before any
          // handshake can occur. We MUST assert
          // that we will only process this buffer
          // AFTER the REPORT_VERSION message has
          // been received. Not doing so will result
          // in the appearance of the program "hanging".
          //
          // Since we cannot do anything with this data
          // until _after_ REPORT_VERSION, discard it.
          //
          this.buffer.length = 0;

        } else if (first === START_SYSEX && (this.buffer.length > 0)) {
          // we have a new command after an incomplete sysex command
          let currByte = data[i];
          if (currByte > 0xF7) { //0x7F changed to 0xF7 for SA5 firmata features
            this.buffer.length = 0;
            this.buffer.push(currByte);
          }
        } else {
          if (first !== START_SYSEX) {
            // Check if data gets out of sync: first byte in buffer
            // must be a valid response if not START_SYSEX
            // Identify response on first byte
            let response = first < START_SYSEX ? (first & START_SYSEX) : first;

            // Check if the first byte is possibly
            // a valid MIDI_RESPONSE (handler)
            if (response !== REPORT_VERSION &&
                response !== ANALOG_MESSAGE &&
                response !== DIGITAL_MESSAGE) {
              // If not valid, then we received garbage and can discard
              // whatever bytes have been been queued.
              this.buffer.length = 0;
            }
          }
        }

        // There are 3 bytes in the buffer and the first is not START_SYSEX:
        // Might have a MIDI Command
        if (this.buffer.length === 3 && first !== START_SYSEX) {
          // response bytes under 0xF0 we have a multi byte operation
          let response = first < START_SYSEX ? (first & START_SYSEX) : first;

          if (MIDI_RESPONSE[response]) {
            // It's ok that this.versionReceived will be set to
            // true every time a valid MIDI_RESPONSE is received.
            // This condition is necessary to ensure that REPORT_VERSION
            // is called first.
            if (this.versionReceived || first === REPORT_VERSION) {
              this.versionReceived = true;
              MIDI_RESPONSE[response](this);
            }
            this.buffer.length = 0;
          } else {
            // A bad serial read must have happened.
            // Reseting the buffer will allow recovery.
            this.buffer.length = 0;
          }
        }
      }
    });

    // if we have not received the version within the allotted
    // time specified by the reportVersionTimeout (user or default),
    // then send an explicit request for it.
    this.reportVersionTimeoutId = setTimeout(() => {
      if (this.versionReceived === false) {
        this.reportVersion(function() {});
        this.queryFirmware(function() {});
      }
    }, settings.reportVersionTimeout);

    const ready = () => {
      this.isReady = true;
      this.emit("ready");
      if (typeof callback === "function") {
        callback();
      }
    }

    // Await the reported version.
    this.once("reportversion", () => {
      clearTimeout(this.reportVersionTimeoutId);
      this.versionReceived = true;
      this.once("queryfirmware", () => {

        // Only preemptively set the sampling interval if `samplingInterval`
        // property was _explicitly_ set as a constructor option.
        if (settings.samplingInterval !== undefined) {
          this.setSamplingInterval(settings.samplingInterval);
        }
        if (settings.skipCapabilities) {
          this.analogPins = settings.analogPins || this.analogPins;
          this.pins = settings.pins || this.pins;
          if (!this.pins.length) {
            for (var i = 0; i < (settings.pinCount || MAX_PIN_COUNT); i++) {
              var supportedModes = [];
              var analogChannel = this.analogPins.indexOf(i);

              if (analogChannel < 0) {
                analogChannel = 127;
              }
              this.pins.push({supportedModes, analogChannel});
            }
          }

          // If the capabilities query is skipped,
          // default resolution values will be used.
          //
          // Based on ATmega328/P
          //
          this.RESOLUTION.ADC = 0x3FF;
          this.RESOLUTION.PWM = 0x0FF;

          ready();
        } else {
          this.queryCapabilities(() => {
            this.queryAnalogMapping(ready);
          });
        }
      });
    });
  }

  /**
   * Asks the arduino to tell us its version.
   * @param {function} callback A function to be called when the arduino has reported its version.
   */

  reportVersion(callback) {
    this.once("reportversion", callback);
    writeToTransport(this, [REPORT_VERSION]);
  }

  /**
   * Asks the arduino to tell us its firmware version.
   * @param {function} callback A function to be called when the arduino has reported its firmware version.
   */

  queryFirmware(callback) {
    this.once("queryfirmware", callback);
    writeToTransport(this, [
      START_SYSEX,
      QUERY_FIRMWARE,
      END_SYSEX
    ]);
  }



  /**
   * Asks the arduino to read analog data. Turn on reporting for this pin.
   * @param {number} pin The pin to read analog data
   * @param {function} callback A function to call when we have the analag data.
   */

  analogRead(pin, callback) {
    this.reportAnalogPin(pin, 1);
    this.addListener(`analog-read-${pin}`, callback);
  }

  /**
   * Write a PWM value Asks the arduino to write an analog message.
   * @param {number} pin The pin to write analog data to.
   * @param {number} value The data to write to the pin between 0 and this.RESOLUTION.PWM.
   */

  pwmWrite(pin, value) {
    let data;

    this.pins[pin].value = value;

    if (pin > 15) {
      data = [
        START_SYSEX,
        EXTENDED_ANALOG,
        pin,
        value & 0x7F,
        (value >> 7) & 0x7F,
      ];

      if (value > 0x00004000) {
        data[data.length] = (value >> 14) & 0x7F;
      }

      if (value > 0x00200000) {
        data[data.length] = (value >> 21) & 0x7F;
      }

      if (value > 0x10000000) {
        data[data.length] = (value >> 28) & 0x7F;
      }

      data[data.length] = END_SYSEX;
    } else {
      data = [
        ANALOG_MESSAGE | pin,
        value & 0x7F,
        (value >> 7) & 0x7F
      ];
    }

    writeToTransport(this, data);
  }

  /**
   * Set a pin to SERVO mode with an explicit PWM range.
   *
   * @param {number} pin The pin the servo is connected to
   * @param {number} min A 14-bit signed int.
   * @param {number} max A 14-bit signed int.
   */

  servoConfig(pin, min, max) {
    if (typeof pin === "object" && pin !== null) {
      let temp = pin;
      pin = temp.pin;
      min = temp.min;
      max = temp.max;
    }

    if (typeof pin === "undefined") {
      throw new Error("servoConfig: pin must be specified");
    }

    if (typeof min === "undefined") {
      throw new Error("servoConfig: min must be specified");
    }

    if (typeof max === "undefined") {
      throw new Error("servoConfig: max must be specified");
    }

    // [0]  START_SYSEX  (0xF0)
    // [1]  SERVO_CONFIG (0x70)
    // [2]  pin number   (0-127)
    // [3]  minPulse LSB (0-6)
    // [4]  minPulse MSB (7-13)
    // [5]  maxPulse LSB (0-6)
    // [6]  maxPulse MSB (7-13)
    // [7]  END_SYSEX    (0xF7)

    this.pins[pin].mode = this.MODES.SERVO;

    writeToTransport(this, [
      START_SYSEX,
      SERVO_CONFIG,
      pin,
      min & 0x7F,
      (min >> 7) & 0x7F,
      max & 0x7F,
      (max >> 7) & 0x7F,
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to move a servo
   * @param {number} pin The pin the servo is connected to
   * @param {number} value The degrees to move the servo to.
   */

  servoWrite(...args) {
    // Values less than 544 will be treated as angles in degrees
    // (valid values in microseconds are handled as microseconds)
    this.analogWrite(...args);
  }

  /**
   * Asks the arduino to set the pin to a certain mode.
   * @param {number} pin The pin you want to change the mode of.
   * @param {number} mode The mode you want to set. Must be one of board.MODES
   */

  pinMode(pin, mode = TYPES.MODES.DITIGAL) {
    if (mode === this.MODES.ANALOG) {
      pin = this.analogPins[pin];
    }
      this.pins[pin].mode = mode;
      writeToTransport(this, [
        PIN_MODE,
        pin,
        mode
      ]);
  }

  /**
   * Asks the arduino to write a value to a digital pin
   * @param {number} pin The pin you want to write a value to.
   * @param {number} value The value you want to write. Must be board.HIGH or board.LOW
   * @param {boolean} enqueue When true, the local state is updated but the command is not sent to the Arduino
   */

  digitalWrite(pin, value, enqueue = false) {
    let port = this.updateDigitalPort(pin, value);

    if (enqueue) {
      this.digitalPortQueue |= 1 << port;
    } else {
      this.writeDigitalPort(port);
    }
  }

  /**
   * Update local store of digital port state
   * @param {number} pin The pin you want to write a value to.
   * @param {number} value The value you want to write. Must be board.HIGH or board.LOW
   */

  updateDigitalPort(pin, value) {
    const port = pin >> 3;
    const bit = 1 << (pin & 0x07);

    this.pins[pin].value = value;

    if (value) {
      this.ports[port] |= bit;
    } else {
      this.ports[port] &= ~bit;
    }

    return port;
  }

  /**
   * Write queued digital ports
   */

  flushDigitalPorts() {
    for (let i = 0; i < this.ports.length; i++) {
      if (this.digitalPortQueue >> i) {
        this.writeDigitalPort(i);
      }
    }
    this.digitalPortQueue = 0x0000;
  }

  /**
   * Update a digital port (group of 8 digital pins) on the Arduino
   * @param {number} port The port you want to update.
   */

  writeDigitalPort(port) {
    writeToTransport(this, [
      DIGITAL_MESSAGE | port,
      this.ports[port] & 0x7F,
      (this.ports[port] >> 7) & 0x7F
    ]);
  }

  /**
   * Asks the arduino to read digital data. Turn on reporting for this pin's port.
   *
   * @param {number} pin The pin to read data from
   * @param {function} callback The function to call when data has been received
   */

  digitalRead(pin, callback) {
    this.reportDigitalPin(pin, 1);
    this.addListener(`digital-read-${pin}`, callback);
  }

  /**
   * Asks the arduino to tell us its capabilities
   * @param {function} callback A function to call when we receive the capabilities
   */

  queryCapabilities(callback) {
    this.once("capability-query", callback);
    writeToTransport(this, [
      START_SYSEX,
      CAPABILITY_QUERY,
      END_SYSEX
    ]);
  }

  /**
   * Asks the arduino to tell us its analog pin mapping
   * @param {function} callback A function to call when we receive the pin mappings.
   */

  queryAnalogMapping(callback) {
    this.once("analog-mapping-query", callback);
    writeToTransport(this, [
      START_SYSEX,
      ANALOG_MAPPING_QUERY,
      END_SYSEX
    ]);
  }

  /**
   * Asks the arduino to tell us the current state of a pin
   * @param {number} pin The pin we want to the know the state of
   * @param {function} callback A function to call when we receive the pin state.
   */

  queryPinState(pin, callback) {
    this.once(`pin-state-${pin}`, callback);
    writeToTransport(this, [
      START_SYSEX,
      PIN_STATE_QUERY,
      pin,
      END_SYSEX
    ]);
  }

  /**
   * Sends a string to the arduino
   * @param {String} string to send to the device
   */

  sendString(string) {
    const bytes = Buffer.from(`${string}\0`, "utf8");
    const data = [];

    data.push(START_SYSEX, STRING_DATA);
    for (let i = 0, length = bytes.length; i < length; i++) {
      data.push(
        bytes[i] & 0x7F,
        (bytes[i] >> 7) & 0x7F
      );
    }
    data.push(END_SYSEX);

    writeToTransport(this, data);
  }

  /**
   * Sends a I2C config request to the arduino board with an optional
   * value in microseconds to delay an I2C Read.  Must be called before
   * an I2C Read or Write
   * @param {number} delay in microseconds to set for I2C Read
   */

  sendI2CConfig(delay) {
    return this.i2cConfig(delay);
  }

  /**
   * Enable I2C with an optional read delay. Must be called before
   * an I2C Read or Write
   *
   * Supersedes sendI2CConfig
   *
   * @param {number} delay in microseconds to set for I2C Read
   *
   * or
   *
   * @param {object} with a single property `delay`
   */

  i2cConfig(options) {
    let settings = i2cActive.get(this);
    let delay;

    if (!settings) {
      settings = {
        /*
          Keys will be I2C peripheral addresses
         */
      };
      i2cActive.set(this, settings);
    }

    if (typeof options === "number") {
      delay = options;
    } else {
      if (typeof options === "object" && options !== null) {
        delay = Number(options.delay);

        // When an address was explicitly specified, there may also be
        // peripheral specific instructions in the config.
        if (typeof options.address !== "undefined") {
          if (!settings[options.address]) {
            settings[options.address] = {
              stopTX: true,
            };
          }
        }

        // When settings have been explicitly provided, just bulk assign
        // them to the existing settings, even if that's empty. This
        // allows for reconfiguration as needed.
        if (typeof options.settings !== "undefined") {
          Object.assign(settings[options.address], options.settings);
          /*
            - stopTX: true | false
                Set `stopTX` to `false` if this peripheral
                expects Wire to keep the transmission connection alive between
                setting a register and requesting bytes.

                Defaults to `true`.
           */
        }
      }
    }

    settings.delay = delay = delay || 0;

    i2cRequest(this, [
      START_SYSEX,
      I2C_CONFIG,
      delay & 0xFF,
      (delay >> 8) & 0xFF,
      END_SYSEX,
    ]);

    return this;
  }

  /**
   * Asks the arduino to send an I2C request to a device
   * @param {number} slaveAddress The address of the I2C device
   * @param {Array} bytes The bytes to send to the device
   */

  sendI2CWriteRequest(slaveAddress, bytes) {
    const data = [];
    /* istanbul ignore next */
    bytes = bytes || [];

    data.push(
      START_SYSEX,
      I2C_REQUEST,
      slaveAddress,
      this.I2C_MODES.WRITE << 3
    );

    for (let i = 0, length = bytes.length; i < length; i++) {
      data.push(
        bytes[i] & 0x7F,
        (bytes[i] >> 7) & 0x7F
      );
    }

    data.push(END_SYSEX);

    i2cRequest(this, data);
  }

  /**
   * Write data to a register
   *
   * @param {number} address      The address of the I2C device.
   * @param {Array} cmdRegOrData  An array of bytes
   *
   * Write a command to a register
   *
   * @param {number} address      The address of the I2C device.
   * @param {number} cmdRegOrData The register
   * @param {Array} inBytes       An array of bytes
   *
   */

  i2cWrite(address, registerOrData, inBytes) {
    /**
     * registerOrData:
     * [... arbitrary bytes]
     *
     * or
     *
     * registerOrData, inBytes:
     * command [, ...]
     *
     */
    const data = [
      START_SYSEX,
      I2C_REQUEST,
      address,
      this.I2C_MODES.WRITE << 3
    ];

    // If i2cWrite was used for an i2cWriteReg call...
    if (arguments.length === 3 &&
        !Array.isArray(registerOrData) &&
        !Array.isArray(inBytes)) {

      return this.i2cWriteReg(address, registerOrData, inBytes);
    }

    // Fix arguments if called with Firmata.js API
    if (arguments.length === 2) {
      if (Array.isArray(registerOrData)) {
        inBytes = registerOrData.slice();
        registerOrData = inBytes.shift();
      } else {
        inBytes = [];
      }
    }

    const bytes = Buffer.from([registerOrData].concat(inBytes));

    for (var i = 0, length = bytes.length; i < length; i++) {
      data.push(
        bytes[i] & 0x7F,
        (bytes[i] >> 7) & 0x7F
      );
    }

    data.push(END_SYSEX);

    i2cRequest(this, data);

    return this;
  }

  /**
   * Write data to a register
   *
   * @param {number} address    The address of the I2C device.
   * @param {number} register   The register.
   * @param {number} byte       The byte value to write.
   *
   */

  i2cWriteReg(address, register, byte) {
    i2cRequest(this, [
      START_SYSEX,
      I2C_REQUEST,
      address,
      this.I2C_MODES.WRITE << 3,
      // register
      register & 0x7F,
      (register >> 7) & 0x7F,
      // byte
      byte & 0x7F,
      (byte >> 7) & 0x7F,
      END_SYSEX,
    ]);

    return this;
  }

  /**
   * Asks the arduino to request bytes from an I2C device
   * @param {number} slaveAddress The address of the I2C device
   * @param {number} numBytes The number of bytes to receive.
   * @param {function} callback A function to call when we have received the bytes.
   */

  sendI2CReadRequest(address, numBytes, callback) {
    i2cRequest(this, [
      START_SYSEX,
      I2C_REQUEST,
      address,
      this.I2C_MODES.READ << 3,
      numBytes & 0x7F,
      (numBytes >> 7) & 0x7F,
      END_SYSEX,
    ]);
    this.once(`I2C-reply-${address}-0`, callback);
  }

  // TODO: Refactor i2cRead and i2cReadOnce
  //      to share most operations.

  /**
   * Initialize a continuous I2C read.
   *
   * @param {number} address    The address of the I2C device
   * @param {number} register   Optionally set the register to read from.
   * @param {number} numBytes   The number of bytes to receive.
   * @param {function} callback A function to call when we have received the bytes.
   */

  i2cRead(address, register, bytesToRead, callback) {

    if (arguments.length === 3 &&
        typeof register === "number" &&
        typeof bytesToRead === "function") {
      callback = bytesToRead;
      bytesToRead = register;
      register = null;
    }

    const data = [
      START_SYSEX,
      I2C_REQUEST,
      address,
      this.I2C_MODES.CONTINUOUS_READ << 3,
    ];
    let event = `I2C-reply-${address}-`;

    if (register !== null) {
      data.push(
        register & 0x7F,
        (register >> 7) & 0x7F
      );
    } else {
      register = 0;
    }

    event += register;

    data.push(
      bytesToRead & 0x7F,
      (bytesToRead >> 7) & 0x7F,
      END_SYSEX
    );

    this.on(event, callback);

    i2cRequest(this, data);

    return this;
  }

  /**
   * Stop continuous reading of the specified I2C address or register.
   *
   * @param {object} options Options:
   *   bus {number} The I2C bus (on supported platforms)
   *   address {number} The I2C peripheral address to stop reading.
   *
   * @param {number} address The I2C peripheral address to stop reading.
   */

  i2cStop(options) {
    // There may be more values in the future
    // var options = {};

    // null or undefined? Do nothing.
    if (options == null) {
      return;
    }

    if (typeof options === "number") {
      options = {
        address: options
      };
    }

    writeToTransport(this, [
      START_SYSEX,
      I2C_REQUEST,
      options.address,
      this.I2C_MODES.STOP_READING << 3,
      END_SYSEX,
    ]);

    Object.keys(this._events).forEach(event => {
      if (event.startsWith(`I2C-reply-${options.address}`)) {
        this.removeAllListeners(event);
      }
    });
  }

  /**
   * Perform a single I2C read
   *
   * Supersedes sendI2CReadRequest
   *
   * Read bytes from address
   *
   * @param {number} address    The address of the I2C device
   * @param {number} register   Optionally set the register to read from.
   * @param {number} numBytes   The number of bytes to receive.
   * @param {function} callback A function to call when we have received the bytes.
   *
   */


  i2cReadOnce(address, register, bytesToRead, callback) {

    if (arguments.length === 3 &&
        typeof register === "number" &&
        typeof bytesToRead === "function") {
      callback = bytesToRead;
      bytesToRead = register;
      register = null;
    }

    const data = [
      START_SYSEX,
      I2C_REQUEST,
      address,
      this.I2C_MODES.READ << 3,
    ];
    let event = `I2C-reply-${address}-`;

    if (register !== null) {
      data.push(
        register & 0x7F,
        (register >> 7) & 0x7F
      );
    } else {
      register = 0;
    }

    event += register;

    data.push(
      bytesToRead & 0x7F,
      (bytesToRead >> 7) & 0x7F,
      END_SYSEX
    );

    this.once(event, callback);

    i2cRequest(this, data);

    return this;
  }

  /**
   * Configure the passed pin as the controller in a 1-wire bus.
   * Pass as enableParasiticPower true if you want the data pin to power the bus.
   * @param pin
   * @param enableParasiticPower
   */

  sendOneWireConfig(pin, enableParasiticPower) {
    writeToTransport(this, [
      START_SYSEX,
      ONEWIRE_DATA,
      ONEWIRE_CONFIG_REQUEST,
      pin,
      enableParasiticPower ? 0x01 : 0x00,
      END_SYSEX,
    ]);
  }

  /**
   * Searches for 1-wire devices on the bus.  The passed callback should accept
   * and error argument and an array of device identifiers.
   * @param pin
   * @param callback
   */

  sendOneWireSearch(pin, callback) {
    this[SYM_sendOneWireSearch](
      ONEWIRE_SEARCH_REQUEST,
      `1-wire-search-reply-${pin}`,
      pin,
      callback
    );
  }

  /**
   * Searches for 1-wire devices on the bus in an alarmed state.  The passed callback
   * should accept and error argument and an array of device identifiers.
   * @param pin
   * @param callback
   */

  sendOneWireAlarmsSearch(pin, callback) {
    this[SYM_sendOneWireSearch](
      ONEWIRE_SEARCH_ALARMS_REQUEST,
      `1-wire-search-alarms-reply-${pin}`,
      pin,
      callback
    );
  }

  [SYM_sendOneWireSearch](type, event, pin, callback) {
    writeToTransport(this, [
      START_SYSEX,
      ONEWIRE_DATA,
      type,
      pin,
      END_SYSEX
    ]);

    const timeout = setTimeout(() => {
      /* istanbul ignore next */
      callback(new Error("1-Wire device search timeout - are you running ConfigurableFirmata?"));
    }, 5000);
    this.once(event, devices => {
      clearTimeout(timeout);
      callback(null, devices);
    });
  }

  /**
   * Reads data from a device on the bus and invokes the passed callback.
   *
   * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
   * @param pin
   * @param device
   * @param numBytesToRead
   * @param callback
   */

  sendOneWireRead(pin, device, numBytesToRead, callback) {
    const correlationId = Math.floor(Math.random() * 255);
    /* istanbul ignore next */
    const timeout = setTimeout(() => {
      /* istanbul ignore next */
      callback(new Error("1-Wire device read timeout - are you running ConfigurableFirmata?"));
    }, 5000);
    this[SYM_sendOneWireRequest](
      pin,
      ONEWIRE_READ_REQUEST_BIT,
      device,
      numBytesToRead,
      correlationId,
      null,
      null,
      `1-wire-read-reply-${correlationId}`,
      data => {
        clearTimeout(timeout);
        callback(null, data);
      }
    );
  }

  /**
   * Resets all devices on the bus.
   * @param pin
   */

  sendOneWireReset(pin) {
    this[SYM_sendOneWireRequest](
      pin,
      ONEWIRE_RESET_REQUEST_BIT
    );
  }

  /**
   * Writes data to the bus to be received by the passed device.  The device
   * should be obtained from a previous call to sendOneWireSearch.
   *
   * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
   * @param pin
   * @param device
   * @param data
   */

  sendOneWireWrite(pin, device, data) {
    this[SYM_sendOneWireRequest](
      pin,
      ONEWIRE_WRITE_REQUEST_BIT,
      device,
      null,
      null,
      null,
      Array.isArray(data) ? data : [data]
    );
  }

  /**
   * Tells firmata to not do anything for the passed amount of ms.  For when you
   * need to give a device attached to the bus time to do a calculation.
   * @param pin
   */

  sendOneWireDelay(pin, delay) {
    this[SYM_sendOneWireRequest](
      pin,
      ONEWIRE_DELAY_REQUEST_BIT,
      null,
      null,
      null,
      delay
    );
  }

  /**
   * Sends the passed data to the passed device on the bus, reads the specified
   * number of bytes and invokes the passed callback.
   *
   * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
   * @param pin
   * @param device
   * @param data
   * @param numBytesToRead
   * @param callback
   */

  sendOneWireWriteAndRead(pin, device, data, numBytesToRead, callback) {
    const correlationId = Math.floor(Math.random() * 255);
    /* istanbul ignore next */
    const timeout = setTimeout(() => {
      /* istanbul ignore next */
      callback(new Error("1-Wire device read timeout - are you running ConfigurableFirmata?"));
    }, 5000);
    this[SYM_sendOneWireRequest](
      pin,
      ONEWIRE_WRITE_REQUEST_BIT | ONEWIRE_READ_REQUEST_BIT,
      device,
      numBytesToRead,
      correlationId,
      null,
      Array.isArray(data) ? data : [data],
      `1-wire-read-reply-${correlationId}`,
      data => {
        clearTimeout(timeout);
        callback(null, data);
      }
    );
  }

  // see http://firmata.org/wiki/Proposals#OneWire_Proposal
  [SYM_sendOneWireRequest](pin, subcommand, device, numBytesToRead, correlationId, delay, dataToWrite, event, callback) {
    const bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (device || numBytesToRead || correlationId || delay || dataToWrite) {
      subcommand = subcommand | ONEWIRE_WITHDATA_REQUEST_BITS;
    }

    if (device) {
      bytes.splice(...[0, 8].concat(device));
    }

    if (numBytesToRead) {
      bytes[8] = numBytesToRead & 0xFF;
      bytes[9] = (numBytesToRead >> 8) & 0xFF;
    }

    if (correlationId) {
      bytes[10] = correlationId & 0xFF;
      bytes[11] = (correlationId >> 8) & 0xFF;
    }

    if (delay) {
      bytes[12] = delay & 0xFF;
      bytes[13] = (delay >> 8) & 0xFF;
      bytes[14] = (delay >> 16) & 0xFF;
      bytes[15] = (delay >> 24) & 0xFF;
    }

    if (dataToWrite) {
      bytes.push(...dataToWrite);
    }

    const output = [
      START_SYSEX,
      ONEWIRE_DATA,
      subcommand,
      pin,
      ...Encoder7Bit.to7BitArray(bytes),
      END_SYSEX,
    ];

    writeToTransport(this, output);

    if (event && callback) {
      this.once(event, callback);
    }
  }

  /**
   * Set sampling interval in millis. Default is 19 ms
   * @param {number} interval The sampling interval in ms > 10
   */

  setSamplingInterval(interval) {
    const safeint = interval < 10 ? 10 : (interval > 65535 ? 65535 : interval);
    this.settings.samplingInterval = safeint;
    writeToTransport(this, [
      START_SYSEX,
      SAMPLING_INTERVAL,
      (safeint & 0x7F),
      ((safeint >> 7) & 0x7F),
      END_SYSEX,
    ]);
  }

  /**
   * Get sampling interval in millis. Default is 19 ms
   *
   * @return {number} samplingInterval
   */

  getSamplingInterval() {
    return this.settings.samplingInterval;
  }

  /**
   * Set reporting on pin
   * @param {number} pin The pin to turn on/off reporting
   * @param {number} value Binary value to turn reporting on/off
   */

  reportAnalogPin(pin, value) {
    if (value === 0 || value === 1) {
      this.pins[this.analogPins[pin]].report = value;
      writeToTransport(this, [
        REPORT_ANALOG | pin,
        value
      ]);
    }
  }

  /**
   * Set reporting on pin
   * @param {number} pin The pin to turn on/off reporting
   * @param {number} value Binary value to turn reporting on/off
   */

  reportDigitalPin(pin, value) {
    const port = pin >> 3;
    if (value === 0 || value === 1) {
      this.pins[pin].report = value;
      writeToTransport(this, [
        REPORT_DIGITAL | port,
        value
      ]);
    }
  }

  /**
   *
   *
   */

  pingRead(options, callback) {

    if (!this.pins[options.pin].supportedModes.includes(PING_READ)) {
      throw new Error("Please upload PingFirmata to the board");
    }

    const {
      pin,
      value,
      pulseOut = 0,
      timeout = 1000000
    } = options;

    writeToTransport(this, [
      START_SYSEX,
      PING_READ,
      pin,
      value,
      ...Firmata.encode([
        (pulseOut >> 24) & 0xFF,
        (pulseOut >> 16) & 0xFF,
        (pulseOut >> 8) & 0xFF,
        (pulseOut & 0xFF),
      ]),
      ...Firmata.encode([
        (timeout >> 24) & 0xFF,
        (timeout >> 16) & 0xFF,
        (timeout >> 8) & 0xFF,
        (timeout & 0xFF),
      ]),
      END_SYSEX,
    ]);

    this.once(`ping-read-${pin}`, callback);
  }

  /**
   * Stepper functions to support version 2 of ConfigurableFirmata's asynchronous control of stepper motors
   * https://github.com/soundanalogous/ConfigurableFirmata
   */

  /**
   * Asks the arduino to configure a stepper motor with the given config to allow asynchronous control of the stepper
   * @param {object} opts Options:
   *    {number} deviceNum: Device number for the stepper (range 0-9)
   *    {number} type: One of this.STEPPER.TYPE.*
   *    {number} stepSize: One of this.STEPPER.STEP_SIZE.*
   *    {number} stepPin: Only used if STEPPER.TYPE.DRIVER
   *    {number} directionPin: Only used if STEPPER.TYPE.DRIVER
   *    {number} motorPin1: motor pin 1
   *    {number} motorPin2:  motor pin 2
   *    {number} [motorPin3]: Only required if type == this.STEPPER.TYPE.THREE_WIRE || this.STEPPER.TYPE.FOUR_WIRE
   *    {number} [motorPin4]: Only required if type == this.STEPPER.TYPE.FOUR_WIRE
   *    {number} [enablePin]: Enable pin
   *    {array} [invertPins]: Array of pins to invert
   */

  accelStepperConfig(options) {

    let {
      deviceNum,
      invertPins,
      motorPin1,
      motorPin2,
      motorPin3,
      motorPin4,
      enablePin,
      stepSize = this.STEPPER.STEP_SIZE.WHOLE,
      type = this.STEPPER.TYPE.FOUR_WIRE,
    } = options;

    const data = [
      START_SYSEX,
      ACCELSTEPPER,
      0x00, // STEPPER_CONFIG from firmware
      deviceNum
    ];

    let iface = ((type & 0x07) << 4) | ((stepSize & 0x07) << 1);
    let pinsToInvert = 0x00;

    if (typeof enablePin !== "undefined") {
      iface = iface | 0x01;
    }

    data.push(iface);

    [
      "stepPin",
      "motorPin1",
      "directionPin",
      "motorPin2",
      "motorPin3",
      "motorPin4",
      "enablePin"
    ].forEach(pin => {
      if (typeof options[pin] !== "undefined") {
        data.push(options[pin]);
      }
    });

    if (Array.isArray(invertPins)) {
      if (invertPins.includes(motorPin1)) {
        pinsToInvert |= 0x01;
      }
      if (invertPins.includes(motorPin2)) {
        pinsToInvert |= 0x02;
      }
      if (invertPins.includes(motorPin3)) {
        pinsToInvert |= 0x04;
      }
      if (invertPins.includes(motorPin4)) {
        pinsToInvert |= 0x08;
      }
      if (invertPins.includes(enablePin)) {
        pinsToInvert |= 0x10;
      }
    }

    data.push(
      pinsToInvert,
      END_SYSEX
    );

    writeToTransport(this, data);
  }

  /**
   * Asks the arduino to set the stepper position to 0
   * Note: This is not a move. We are setting the current position equal to zero
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   */

  accelStepperZero(deviceNum) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x01, // STEPPER_ZERO from firmware
      deviceNum,
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to move a stepper a number of steps
   * (and optionally with and acceleration and deceleration)
   * speed is in units of steps/sec
   * @param {number} deviceNum Device number for the stepper (range 0-5)
   * @param {number} steps Number of steps to make
   */
  accelStepperStep(deviceNum, steps, callback) {

    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x02, // STEPPER_STEP from firmware
      deviceNum,
      ...encode32BitSignedInteger(steps),
      END_SYSEX,
    ]);

    if (callback) {
      this.once(`stepper-done-${deviceNum}`, callback);
    }
  }

  /**
   * Asks the arduino to move a stepper to a specific location
   * @param {number} deviceNum Device number for the stepper (range 0-5)
   * @param {number} position Desired position
   */
  accelStepperTo(deviceNum, position, callback) {

    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x03, // STEPPER_TO from firmware
      deviceNum,
      ...encode32BitSignedInteger(position),
      END_SYSEX,
    ]);

    if (callback) {
      this.once(`stepper-done-${deviceNum}`, callback);
    }
  }

  /**
   * Asks the arduino to enable/disable a stepper
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   * @param {boolean} [enabled]
   */

  accelStepperEnable(deviceNum, enabled = true) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x04, // ENABLE from firmware
      deviceNum,
      enabled & 0x01,
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to stop a stepper
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   */

  accelStepperStop(deviceNum) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x05, // STEPPER_STOP from firmware
      deviceNum,
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to report the position of a stepper
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   */

  accelStepperReportPosition(deviceNum, callback) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x06, // STEPPER_REPORT_POSITION from firmware
      deviceNum,
      END_SYSEX,
    ]);

    if (callback) {
      this.once(`stepper-position-${deviceNum}`, callback);
    }
  }

  /**
   * Asks the arduino to set the acceleration for a stepper
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   * @param {number} acceleration Desired acceleration in steps per sec^2
   */

  accelStepperAcceleration(deviceNum, acceleration) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x08, // STEPPER_SET_ACCELERATION from firmware
      deviceNum,
      ...encodeCustomFloat(acceleration),
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to set the max speed for a stepper
   * @param {number} deviceNum Device number for the stepper (range 0-9)
   * @param {number} speed Desired speed or maxSpeed in steps per second
   * @param {function} [callback]
   */

  accelStepperSpeed(deviceNum, speed) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x09, // STEPPER_SET_SPEED from firmware
      deviceNum,
      ...encodeCustomFloat(speed),
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to configure a multiStepper group
   * @param {object} options Options:
   *    {number} groupNum: Group number for the multiSteppers (range 0-5)
   *    {number} devices: array of accelStepper device numbers in group
   **/

  multiStepperConfig(options) {
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x20, // MULTISTEPPER_CONFIG from firmware
      options.groupNum,
      ...options.devices,
      END_SYSEX,
    ]);
  }

  /**
   * Asks the arduino to move a multiStepper group
   * @param {number} groupNum Group number for the multiSteppers (range 0-5)
   * @param {number} positions array of absolute stepper positions
   **/

  multiStepperTo(groupNum, positions, callback) {
    if (groupNum < 0 || groupNum > 5) {
      throw new RangeError(`Invalid "groupNum": ${groupNum}. Expected "groupNum" between 0-5`);
    }

    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x21, // MULTISTEPPER_TO from firmware
      groupNum,
      ...positions.reduce((a, b) => a.concat(...encode32BitSignedInteger(b)), []),
      END_SYSEX,
    ]);

    if (callback) {
      this.once(`multi-stepper-done-${groupNum}`, callback);
    }
  }

  /**
   * Asks the arduino to stop a multiStepper group
   * @param {number} groupNum: Group number for the multiSteppers (range 0-5)
   **/

  multiStepperStop(groupNum) {
    if (groupNum < 0 || groupNum > 5) {
      throw new RangeError(`Invalid "groupNum": ${groupNum}. Expected "groupNum" between 0-5`);
    }
    writeToTransport(this, [
      START_SYSEX,
      ACCELSTEPPER,
      0x23, // MULTISTEPPER_STOP from firmware
      groupNum,
      END_SYSEX,
    ]);
  }

  /**
   * Stepper functions to support AdvancedFirmata's asynchronous control of stepper motors
   * https://github.com/soundanalogous/AdvancedFirmata
   */

  /**
   * Asks the arduino to configure a stepper motor with the given config to allow asynchronous control of the stepper
   * @param {number} deviceNum Device number for the stepper (range 0-5, expects steppers to be setup in order from 0 to 5)
   * @param {number} type One of this.STEPPER.TYPE.*
   * @param {number} stepsPerRev Number of steps motor takes to make one revolution
   * @param {number} stepOrMotor1Pin If using EasyDriver type stepper driver, this is direction pin, otherwise it is motor 1 pin
   * @param {number} dirOrMotor2Pin If using EasyDriver type stepper driver, this is step pin, otherwise it is motor 2 pin
   * @param {number} [motorPin3] Only required if type == this.STEPPER.TYPE.FOUR_WIRE
   * @param {number} [motorPin4] Only required if type == this.STEPPER.TYPE.FOUR_WIRE
   */

  stepperConfig(deviceNum, type, stepsPerRev, dirOrMotor1Pin, dirOrMotor2Pin, motorPin3, motorPin4) {
    writeToTransport(this, [
      START_SYSEX,
      STEPPER,
      0x00, // STEPPER_CONFIG from firmware
      deviceNum,
      type,
      stepsPerRev & 0x7F,
      (stepsPerRev >> 7) & 0x7F,
      dirOrMotor1Pin,
      dirOrMotor2Pin,
      ...(type === this.STEPPER.TYPE.FOUR_WIRE ? [motorPin3, motorPin4] : []),
      END_SYSEX
    ]);
  }

  /**
   * Asks the arduino to move a stepper a number of steps at a specific speed
   * (and optionally with and acceleration and deceleration)
   * speed is in units of .01 rad/sec
   * accel and decel are in units of .01 rad/sec^2
   * TODO: verify the units of speed, accel, and decel
   * @param {number} deviceNum Device number for the stepper (range 0-5)
   * @param {number} direction One of this.STEPPER.DIRECTION.*
   * @param {number} steps Number of steps to make
   * @param {number} speed
   * @param {number|function} accel Acceleration or if accel and decel are not used, then it can be the callback
   * @param {number} [decel]
   * @param {function} [callback]
   */

  stepperStep(deviceNum, direction, steps, speed, accel, decel, callback) {
    if (typeof accel === "function") {
      callback = accel;
      accel = 0;
      decel = 0;
    }

    writeToTransport(this, [
      START_SYSEX,
      STEPPER,
      0x01, // STEPPER_STEP from firmware
      deviceNum,
      direction, // one of this.STEPPER.DIRECTION.*
      steps & 0x7F, (steps >> 7) & 0x7F, (steps >> 14) & 0x7F,
      speed & 0x7F, (speed >> 7) & 0x7F,

      ...(accel > 0 || decel > 0 ?
          [accel & 0x7F, (accel >> 7) & 0x7F, decel & 0x7F, (decel >> 7) & 0x7F] : []),

      END_SYSEX,
    ]);

    if (callback) {
      this.once(`stepper-done-${deviceNum}`, callback);
    }
  }

  /**
   * Asks the Arduino to configure a hardware or serial port.
   * @param {object} options Options:
   *   portId {number} The serial port to use (HW_SERIAL1, HW_SERIAL2, HW_SERIAL3, SW_SERIAL0,
   *   SW_SERIAL1, SW_SERIAL2, SW_SERIAL3)
   *   baud {number} The baud rate of the serial port
   *   rxPin {number} [SW Serial only] The RX pin of the SoftwareSerial instance
   *   txPin {number} [SW Serial only] The TX pin of the SoftwareSerial instance
   */

  serialConfig(options) {

    let portId;
    let baud;
    let rxPin;
    let txPin;

    if (typeof options === "object" && options !== null) {
      portId = options.portId;
      baud = options.baud;
      rxPin = options.rxPin;
      txPin = options.txPin;
    }

    if (typeof portId === "undefined") {
      throw new Error("portId must be specified, see SERIAL_PORT_IDs for options.");
    }

    baud = baud || 57600;

    const data = [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_CONFIG | portId,
      baud & 0x7F,
      (baud >> 7) & 0x7F,
      (baud >> 14) & 0x7F
    ];
    if (portId > 7 && typeof rxPin !== "undefined" && typeof txPin !== "undefined") {
      data.push(
        rxPin,
        txPin
      );
    } else if (portId > 7) {
      throw new Error("Both RX and TX pins must be defined when using Software Serial.");
    }

    data.push(END_SYSEX);
    writeToTransport(this, data);
  }

  /**
   * Write an array of bytes to the specified serial port.
   * @param {number} portId The serial port to write to.
   * @param {Array} inBytes An array of bytes to write to the serial port.
   */

  serialWrite(portId, bytes) {
    const data = [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_WRITE | portId,
    ];
    for (let i = 0, len = bytes.length; i < len; i++) {
      data.push(
        bytes[i] & 0x7F,
        (bytes[i] >> 7) & 0x7F
      );
    }
    data.push(END_SYSEX);
    if (bytes.length > 0) {
      writeToTransport(this, data);
    }
  }

  /**
   * Start continuous reading of the specified serial port. The port is checked for data each
   * iteration of the main Arduino loop.
   * @param {number} portId The serial port to start reading continuously.
   * @param {number} maxBytesToRead [Optional] The maximum number of bytes to read per iteration.
   * If there are less bytes in the buffer, the lesser number of bytes will be returned. A value of 0
   * indicates that all available bytes in the buffer should be read.
   * @param {function} callback A function to call when we have received the bytes.
   */

  serialRead(portId, maxBytesToRead, callback) {
    const data = [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_READ | portId,
      this.SERIAL_MODES.CONTINUOUS_READ
    ];

    if (arguments.length === 2 && typeof maxBytesToRead === "function") {
      callback = maxBytesToRead;
    } else {
      data.push(
        maxBytesToRead & 0x7F,
        (maxBytesToRead >> 7) & 0x7F
      );
    }

    data.push(END_SYSEX);
    writeToTransport(this, data);

    this.on(`serial-data-${portId}`, callback);
  }

  /**
   * Stop continuous reading of the specified serial port. This does not close the port, it stops
   * reading it but keeps the port open.
   * @param {number} portId The serial port to stop reading.
   */

  serialStop(portId) {
    writeToTransport(this, [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_READ | portId,
      this.SERIAL_MODES.STOP_READING,
      END_SYSEX,
    ]);

    this.removeAllListeners(`serial-data-${portId}`);
  }

  /**
   * Close the specified serial port.
   * @param {number} portId The serial port to close.
   */

  serialClose(portId) {
    writeToTransport(this, [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_CLOSE | portId,
      END_SYSEX,
    ]);
  }

  /**
   * Flush the specified serial port. For hardware serial, this waits for the transmission of
   * outgoing serial data to complete. For software serial, this removed any buffered incoming serial
   * data.
   * @param {number} portId The serial port to flush.
   */

  serialFlush(portId) {
    writeToTransport(this, [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_FLUSH | portId,
      END_SYSEX,
    ]);
  }

  /**
   * For SoftwareSerial only. Only a single SoftwareSerial instance can read data at a time.
   * Call this method to set this port to be the reading port in the case there are multiple
   * SoftwareSerial instances.
   * @param {number} portId The serial port to listen on.
   */

  serialListen(portId) {
    // listen only applies to software serial ports
    if (portId < 8) {
      return;
    }
    writeToTransport(this, [
      START_SYSEX,
      SERIAL_MESSAGE,
      SERIAL_LISTEN | portId,
      END_SYSEX,
    ]);
  }

  /**
   * Allow user code to handle arbitrary sysex responses
   *
   * @param {number} commandByte The commandByte must be associated with some message
   *                             that's expected from the slave device. The handler is
   *                             called with an array of _raw_ data from the slave. Data
   *                             decoding must be done within the handler itself.
   *
   *                             Use Firmata.decode(data) to extract useful values from
   *                             the incoming response data.
   *
   *  @param {function} handler Function which handles receipt of responses matching
   *                            commandByte.
   */

  sysexResponse(commandByte, handler) {
    if (Firmata.SYSEX_RESPONSE[commandByte]) {
      throw new Error(`${commandByte} is not an available SYSEX_RESPONSE byte`);
    }

    Firmata.SYSEX_RESPONSE[commandByte] = board => handler.call(board, board.buffer.slice(2, -1));

    return this;
  }

  /*
   * Allow user to remove sysex response handlers.
   *
   * @param {number} commandByte The commandByte to disassociate with a handler
   *                             previously set via `sysexResponse( commandByte, handler)`.
   */

  clearSysexResponse(commandByte) {
    if (Firmata.SYSEX_RESPONSE[commandByte]) {
      delete Firmata.SYSEX_RESPONSE[commandByte];
    }
  }

  /**
   * Allow user code to send arbitrary sysex messages
   *
   * @param {Array} message The message array is expected to be all necessary bytes
   *                        between START_SYSEX and END_SYSEX (non-inclusive). It will
   *                        be assumed that the data in the message array is
   *                        already encoded as 2 7-bit bytes LSB first.
   *
   *
   */

  sysexCommand(message) {

    if (!message || !message.length) {
      throw new Error("Sysex Command cannot be empty");
    }

    writeToTransport(this, [
      START_SYSEX,
      ...message.slice(),
      END_SYSEX
    ]);
    return this;
  }

  /**
   * Send SYSTEM_RESET to arduino
   */

  reset() {
    writeToTransport(this, [SYSTEM_RESET]);
  }

  /**
   * Firmata.isAcceptablePort Determines if a `port` object (from SerialPort.list())
   * is a valid Arduino (or similar) device.
   * @return {Boolean} true if port can be connected to by Firmata
   */

  static isAcceptablePort(port) {
    let rport = /usb|acm|^com/i;

    if (rport.test(port.path)) {
      return true;
    }

    return false;
  }

  /**
   * Firmata.requestPort(callback) Request an acceptable port to connect to.
   * callback(error, port)
   */

  static requestPort(callback) {
    throw new Error('DEPRECATED')
  }

  // Expose encode/decode for custom sysex messages
  static encode(data) {
    const encoded = [];
    const length = data.length;

    for (let i = 0; i < length; i++) {
      encoded.push(
        data[i] & 0x7F,
        (data[i] >> 7) & 0x7F
      );
    }

    return encoded;
  }

  static decode(data) {
    const decoded = [];

    if (data.length % 2 !== 0) {
      throw new Error("Firmata.decode(data) called with odd number of data bytes");
    }

    while (data.length) {
      const lsb = data.shift();
      const msb = data.shift();
      decoded.push(lsb | (msb << 7));
    }

    return decoded;
  }
}

// Prototype Compatibility Aliases
Firmata.prototype.analogWrite = Firmata.prototype.pwmWrite;

// Static Compatibility Aliases
Firmata.Board = Firmata;
Firmata.SYSEX_RESPONSE = SYSEX_RESPONSE;
Firmata.MIDI_RESPONSE = MIDI_RESPONSE;

// The following are used internally.

/**
 * writeToTransport Due to the non-blocking behaviour of transport write
 *                   operations, dependent programs need a way to know
 *                   when all writes are complete. Every write increments
 *                   a `pending` value, when the write operation has
 *                   completed, the `pending` value is decremented.
 *
 * @param  {Board} board An active Board instance
 * @param  {Array} data  An array of 8 and 7 bit values that will be
 *                       wrapped in a Buffer and written to the transport.
 */
function writeToTransport(board, data) {
  board.pending++;
  board.transport.write(Buffer.from(data), () => board.pending--);
}

function i2cRequest(board, bytes) {
  const active = i2cActive.get(board);

  if (!active) {
    throw new Error("I2C is not enabled for this board. To enable, call the i2cConfig() method.");
  }

  // Do not tamper with I2C_CONFIG messages
  if (bytes[1] === I2C_REQUEST) {
    const address = bytes[2];

    // If no peripheral settings exist, make them.
    if (!active[address]) {
      active[address] = {
        stopTX: true,
      };
    }

    // READ (8) or CONTINUOUS_READ (16)
    // value & 0b00011000
    if (bytes[3] & I2C_READ_MASK) {
      // Invert logic to accomodate default = true,
      // which is actually stopTX = 0
      bytes[3] |= Number(!active[address].stopTX) << 6;
    }
  }

  writeToTransport(board, bytes);
}


function encode32BitSignedInteger(data) {
  const negative = data < 0;

  data = Math.abs(data);

  const encoded = [
    data & 0x7F,
    (data >> 7) & 0x7F,
    (data >> 14) & 0x7F,
    (data >> 21) & 0x7F,
    (data >> 28) & 0x07
  ];

  if (negative) {
    encoded[encoded.length - 1] |= 0x08;
  }

  return encoded;
}

function decode32BitSignedInteger(bytes) {
  let result = (bytes[0] & 0x7F) |
    ((bytes[1] & 0x7F) << 7) |
    ((bytes[2] & 0x7F) << 14) |
    ((bytes[3] & 0x7F) << 21) |
    ((bytes[4] & 0x07) << 28);

  if (bytes[4] >> 3) {
    result *= -1;
  }

  return result;
}

const MAX_SIGNIFICAND = Math.pow(2, 23);

function encodeCustomFloat(input) {
  const sign = input < 0 ? 1 : 0;

  input = Math.abs(input);

  const base10 = Math.floor(Math.log10(input));
  // Shift decimal to start of significand
  let exponent = 0 + base10;
  input /= Math.pow(10, base10);

  // Shift decimal to the right as far as we can
  while (!Number.isInteger(input) && input < MAX_SIGNIFICAND) {
    exponent -= 1;
    input *= 10;
  }

  // Reduce precision if necessary
  while (input > MAX_SIGNIFICAND) {
    exponent += 1;
    input /= 10;
  }

  input = Math.trunc(input);
  exponent += 11;

  const encoded = [
    input & 0x7F,
    (input >> 7) & 0x7F,
    (input >> 14) & 0x7F,
    (input >> 21) & 0x03 | (exponent & 0x0F) << 2 | (sign & 0x01) << 6
  ];

  return encoded;
}

function decodeCustomFloat(input) {
  const exponent = ((input[3] >> 2) & 0x0F) - 11;
  const sign = (input[3] >> 6) & 0x01;

  let result = input[0] |
    (input[1] << 7) |
    (input[2] << 14) |
    (input[3] & 0x03) << 21;

  if (sign) {
    result *= -1;
  }
  return result * Math.pow(10, exponent);
}


const bindTransport = function(transport) {
  Transport = transport;
  return Firmata;
};

bindTransport.Firmata = Firmata;

export default bindTransport;

export const Board = Firmata
