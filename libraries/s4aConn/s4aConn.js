// S4A Connector Extension
// =======================
// 🄯 Joan Guillén i Pelegay
// (jguille2), August 2025
// ------------------------
// Snap for All firmata boards Connector. Connecting Snap! to any Firmata compatible
// board: UNO, Nano, Mega, Leonardo, Micro, Due, 101, ESP8266, NodeMCU...
// to dynamically control their functionalities.
//
// Using Firmata protocol. StandardFirmata is enough to support the main features and I2C
// Extended with the SA5Firmata project to support tone, pulses, ping, dht11, neopixels, IR..
// https://github.com/jguille2/SA5
// 
// This extension wants to give continuity to the S4A and Snap4Arduino projects
// (Citilab, Bernat Romagosa, Joan Guillén)
//
// We are using the WebSerial Firmata implementation "firmata-web" by Jelle Hak
// https://github.com/yellow-digital/firmata-web
// forked in https://github.com/jguille2/firmata-web

import { Firmata, WebSerialTransport } from "./firmata-web/index.js";

// s4aConnector //////////////////////////////////////////////////////

// From Snap4Arduino arduino.js 
function s4aConnector (stage) {
    this.init(stage);
};

s4aConnector.prototype.init = function (stage) {
    this.stage = stage;
    this.port = null;
    this.transport = null;
    this.board = null;
};

s4aConnector.prototype.selectPort = function () {
    if (this.board) {
        var myself = this;
        this.transport.on('close', function () { myself.selectPort(); });
        this.disconnect(
            true // quietly
        );
    } else {
        navigator.serial.requestPort().then(port => this.connect(port));
    }
};

s4aConnector.prototype.connect = function (port) {
    var myself = this,
        dialog =
            new DialogBoxMorph().inform(
                'S4A Connector',
                localize('Connecting board...'),
                this.stage.world()
            );

    setTimeout(
        function () {
            if (!(myself.board && myself.board.isReady)) {
                dialog.destroy();
                myself.disconnected('Timed out while attempting to connect.');
            }
        },
        6000
    );

    this.port = port;

    port.open({ baudRate: 57600 }).then(() => {
        this.transport = new WebSerialTransport(port);
        this.board = new Firmata(this.transport);
        this.board.on('ready', () => {
            if (dialog) { dialog.destroy(); }
            new DialogBoxMorph().inform(
                'S4A Connector',
                localize('Your board has been connected. Happy prototyping!'),
                this.stage.world()
            );
            this.transport.port.ondisconnect = function () {
                myself.disconnected();
            };
        });

    });
};

s4aConnector.prototype.disconnect = function (quietly) {
    if (this.board) {
        this.board.serialClose();
        this.board = null;
        if (!quietly) {
            new DialogBoxMorph().inform(
                'S4A Connector',
                localize('Connection closed.'),
                this.stage.world()
            );
        }
    } else {
        if (!quietly) {
            new DialogBoxMorph().inform(
                'S4A Connector',
                localize('No board connected.'),
                this.stage.world()
            );
        }
    }
    if (this.port) {
            this.port.forget();
            this.port = null;
    }
};

s4aConnector.prototype.disconnected = function (message) {
    // Board was disconnected because of some error, or cable was unplugged
    this.disconnect(true);
    new DialogBoxMorph().inform(
        'S4A Connector',
        message || 'Board was disconnected',
        this.stage.world()
    );
};

s4aConnector.prototype.isBoardReady = function () {
    //return ((typeof this.board !== 'undefined') 
    //        && (this.board.pins.length > 0));
    return Boolean(this.board);
};

s4aConnector.prototype.pinsSettableToMode = function (aMode) {
    // Retrieve an object with a list of pins that support a particular mode
    var myself = this,
        pinNumbers = {};
    this.board.pins.forEach(
        function (each) { 
            if (each.supportedModes.indexOf(aMode) > -1) { 
                var number = myself.board.pins.indexOf(each).toString(); 
                pinNumbers[number] = number;
            }
        }
    );

    return pinNumbers;
};

// From Snap4Arduino threads.js

s4aConnector.prototype.digitalWrite = function (pin, value, proc) {
    var board = this.board;
    if (board && board.isReady) {
        if (board.pins[pin].mode != board.MODES.OUTPUT) {
            board.pinMode(pin, board.MODES.OUTPUT);
            proc.pushContext('doYield');
            proc.pushContext();
        }
        var val = value ? board.HIGH : board.LOW;
        board.digitalWrite(pin, val);
    } else {
        throw new Error('No board connected.');
    }
};

s4aConnector.prototype.pwmWrite = function (pin, value, proc) {
    var board = this.board;
    if (board && board.isReady) {
        if (board.pins[pin].mode != board.MODES.PWM) {
            board.pinMode(pin, board.MODES.PWM);
            proc.pushContext('doYield');
            proc.pushContext();
        }
        board.analogWrite(pin, value);
    } else {
        throw new Error('No board connected.');
    }
};

s4aConnector.prototype.servoWrite = function (pin, value, proc) {
    var board = this.board,
        numericValue = parseInt(value);

    if (board && board.isReady) {
        if (value == 'disconnected') {
            board.pinMode(pin, board.MODES.OUTPUT);
            return;
        }
        if (board.pins[pin].mode != board.MODES.SERVO) {
            board.pinMode(pin, board.MODES.SERVO);
            board.servoConfig(pin, 600, 2400);
        }

        switch (value) {
            case 'clockwise':
                numericValue = 1200;
                break;
            case 'counter-clockwise':
                numericValue = 1800;
                break;
            case 'stopped':
                numericValue = 1500;
                break;
        }
        board.servoWrite(pin, numericValue);
    } else {
        throw new Error('No board connected.');
    }
};

s4aConnector.prototype.reportDigitalReading = function (pin, proc) {
    var board = this.board;
    if (board && board.isReady) {
        if (board.pins[pin].mode != board.MODES.INPUT) {
            board.pinMode(pin, board.MODES.INPUT);
            board.pins[pin].reporting = 1;
        } else {
            if (board.pins[pin].reporting != 2) {
                //board.reportDigitalPin(pin, 1);
                board.digitalRead(pin, function () {board.pins[pin].reporting = 2});
            } else {
                return board.pins[pin].value == 1;
            }
        }
        proc.pushContext('doYield');
        proc.pushContext();
    } else {
        throw new Error('No board connected.');
    }
};

s4aConnector.prototype.reportAnalogReading = function (pin, proc) {
    var board = this.board;
    if (board && board.isReady) {
        if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
            board.pinMode(pin, board.MODES.ANALOG);
            board.pins[board.analogPins[pin]].reporting = 1;
        } else {
            if (board.pins[board.analogPins[pin]].reporting != 2) {
                //board.reportAnalogPin(pin, 1);
                board.analogRead(pin, function () {board.pins[board.analogPins[pin]].reporting = 2});
            } else {
                return board.pins[board.analogPins[pin]].value;
            }
        }
        proc.pushContext('doYield');
        proc.pushContext();
    } else {
        throw new Error('No board connected.');
    }
};

s4aConnector.prototype.reportConnected = function () {
    return this.isBoardReady();
};

// S4A Connector buttons

SnapExtensions.buttons.palette.push({
    category: 'S4A Connector',
    label: 'Connect',
    hideable: false,
    action: function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.s4aConnector) {
            stage.s4aConnector = new s4aConnector(stage);
        }
        stage.s4aConnector.selectPort();
    }
});

SnapExtensions.buttons.palette.push({
    category: 'S4A Connector',
    label: 'Disconnect',
    hideable: false,
    action: function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.s4aConnector) {
            stage.s4aConnector = new s4aConnector(stage);
        }
        stage.s4aConnector.disconnect();
    }
});

// Initialize the extension

(function() {
    var ide = world.children[0],
        stage = ide.stage;

    // Redo palette so the button actually shows up
    world.children[0].flushBlocksCache();
    world.children[0].refreshPalette();

    // Init controller
    if (!stage.s4aConnector) {
        stage.s4aConnector = new s4aConnector(stage);
    }
})();

// S4A Connector menu extensions - From Snap4Arduino blocks.js

SnapExtensions.menus.set(
    's4a_digitalPinMenu',
    function () {
        var target = this.parentThatIsA(BlockMorph).scriptTarget(),
            s4aConnector = target.parentThatIsA(StageMorph).s4aConnector,
            dict = {};
        // All digitals have modes INPUT, OUTPUT, SERVO AND PULLUP
        if (s4aConnector.board) {dict = s4aConnector.pinsSettableToMode(s4aConnector.board.MODES.INPUT); }
        return dict;
    }// All digitals have modes INPUT, OUTPUT, SERVO AND PULLUP
);

SnapExtensions.menus.set(
    's4a_pwmPinMenu',
    function () {
        var target = this.parentThatIsA(BlockMorph).scriptTarget(),
            s4aConnector = target.parentThatIsA(StageMorph).s4aConnector,
            dict = {};
        if (s4aConnector.board) {
            Object.keys(s4aConnector.pinsSettableToMode(s4aConnector.board.MODES.PWM)).forEach(
                function (each) { dict[each + '~'] = each }
            );
        }
        return dict;
    }
);

SnapExtensions.menus.set(
    's4a_analogPinMenu',
    function () {
        var target = this.parentThatIsA(BlockMorph).scriptTarget(),
            s4aConnector = target.parentThatIsA(StageMorph).s4aConnector,
            dict = {};
        if (s4aConnector.board) {
            var analogPin;
            s4aConnector.board.analogPins.forEach(
                function (each) {
                    analogPin = (each - s4aConnector.board.analogPins[0]).toString();
                    dict[analogPin] = analogPin;
                }
            );
        }
        return dict;
    }
);

// S4A Connector extension

SnapExtensions.primitives.set(
    's4a_digitalWrite(pin, value)',
    function (pin, value, proc) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        stage.s4aConnector.digitalWrite(pin, value, proc);
    }
);

SnapExtensions.primitives.set(
    's4a_pwmWrite(pin, value)',
    function (pin, value, proc) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        stage.s4aConnector.pwmWrite(pin, value, proc);
    }
);

SnapExtensions.primitives.set(
    's4a_servoWrite(pin, value)',
    function (pin, value, proc) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        stage.s4aConnector.servoWrite(pin, value, proc);
    }
);

SnapExtensions.primitives.set(
    's4a_reportDigitalReading(pin)',
    function (pin, proc) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        return stage.s4aConnector.reportDigitalReading(pin, proc);
    }
);

SnapExtensions.primitives.set(
    's4a_reportAnalogReading(pin)',
    function (pin, proc) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        return stage.s4aConnector.reportAnalogReading(pin, proc);
    }
);

SnapExtensions.primitives.set(
    's4a_reportConnected',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!stage.s4aConnector) {
            throw new Error('No board connected.');
        }
        return stage.s4aConnector.reportConnected();
    }
);

SnapExtensions.primitives.set(
    's4a_i2cwrite(address, bytes, reg)',
    function (address, bytes, reg) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (!board.i2cEnabled) {
            board.i2cConfig();
            board.i2cEnabled = true;
        }
        board.i2cWrite(address, reg, bytes.asArray());
    }
);

SnapExtensions.primitives.set(
    's4a_i2csend(address, bytes)',
    function (address, bytes) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (!board.i2cEnabled) {
            board.i2cConfig();
            board.i2cEnabled = true;
        }
        board.i2cWrite(address, bytes.asArray());
    }
);

SnapExtensions.primitives.set(
    's4a_i2cread1(address, reg)',
    function (address, reg) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        board['i2cResponse-' + Number(address)] = null;
        if (!board.i2cEnabled) {
            board.i2cConfig();
            board.i2cEnabled = true;
        }
        board.i2cReadOnce(
            Number(address),
            Number(reg),
            function (response) {
                board['i2cResponse-' + Number(address)] = response;
            });
    }
);

SnapExtensions.primitives.set(
    's4a_i2cread2(address)',
    function (address) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        return board['i2cResponse-' + Number(address)] !== null;
    }
);

SnapExtensions.primitives.set(
    's4a_i2cread3(address)',
    function (address) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        return new List(board['i2cResponse-' + Number(address)]);
    }
);

SnapExtensions.primitives.set(
    's4a_tone(pin, freq, dur)',
    function (pin, freq, dur) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        if (pin === undefined || freq === undefined || pin <= 1 || pin > 255 || freq < 0 || freq > 65535) {
            throw new Error("Required values: pin (2-255) and frequency (0-65535)");
        }
        var dur = dur || 0;
        dur = dur & 0xFFFF; //clamping value to 32 bits
        var data =[0xF0, //START_SYSEX
            0xC7,  //Tone Command
            (dur >> 25) & 0x7F,
            (dur >> 18) & 0x7F,
            (dur >> 11) & 0x7F,
            (dur >> 4) & 0x7F,
            ((dur << 3) & parseInt("01111000",2)) | ((freq >> 13) & parseInt("0111",2)),
            (freq >> 6) & 0x7F,
            ((freq << 1) & parseInt("01111110",2)) | ((pin >> 7) & parseInt("01",2)),
            pin & 0x7F,
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_pulseOut(pin, stValue, time1, time2, time3)',
    function (pin, stValue, time1, time2, time3) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var value = 1;
        if (stValue == "LOW") {value = 0;} //only explicit LOW causes a low pulse 
        if (pin === undefined || pin <= 1 || pin > 255) {
            throw new Error("Required values: pin (2-255)");
        }
        //undefined time will be 0 seconds
        var time1 = time1 || 0,
            time2 = time2 || 0,
            time3 = time3 || 0;
        //clamping time values to 11 bits
        time1 = time1 & parseInt("011111111111",2);
        time2 = time2 & parseInt("011111111111",2);
        time3 = time3 & parseInt("011111111111",2);
        var data = [0xF0, //START_SYSEX
            0xC9,  //microsecondsPulseOut Command
            (time1 >> 4) & 0x7F,
            ((time1 << 3) & parseInt("01111000",2)) | ((time2 >> 8) & parseInt("0111",2)),
            (time2 >> 1) & 0x7F,
            ((time2 << 6) & parseInt("01000000",2)) | ((time3 >> 5) & parseInt("0111111",2)),
            ((time3 << 2) & parseInt("01111100",2)) | ((value << 1) & parseInt("010",2)) |           ((pin >> 7) & parseInt("01",2)),
            (pin & 0x7F), 
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_pulseIn1(pin, stValue, timeout)',
    function (pin, stValue, timeout) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board,
            value = 1;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        board["pulseIn-"+pin] = null;
        if (stValue == "LOW") {value = 0;} //only explicit LOW return a low pulse 
        if (pin === undefined || pin <= 1 || pin > 255) {
            throw new Error("Required values: pin (2-255)");
        }
        var timeout = timeout || 0; //undefined will be 0, and 0 causes Arduino's default (1s)
        timeout = timeout & 0xFFFFFFFF; //clamping value to 32 bits
        board.once("pulseIn-"+pin, function(data){board["pulseIn-"+pin] = data;});
        var data =[0xF0, //START_SYSEX
            0xC8,  //PulseIn Command
            (timeout >> 25) & 0x7F,
            (timeout >> 18) & 0x7F,
            (timeout >> 11) & 0x7F,
            (timeout >> 4) & 0x7F,
            ((timeout << 3) & parseInt("01111000",2)) | ((value << 2) & parseInt("0100",2)) | ((pin >> 6) & parseInt("011",2)),
            (pin & parseInt("0111111",2)),
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_pulseIn2(pin)',
    function (pin) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        return (board["pulseIn-"+pin] != null);
    }
);

SnapExtensions.primitives.set(
    's4a_pulseIn3(pin)',
    function (pin) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        return board["pulseIn-"+pin];
    }
);

SnapExtensions.primitives.set(
    's4a_ping1(pinRec, pinSen, time1, time2)',
    function (pinRec, pinSen, time1, time2) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        board["ping-"+pinRec] = null;
        if (pinSen === undefined || pinSen <= 1 || pinSen > 255 || pinRec === undefined || pinRec <= 1 || pinRec > 255) {
            throw new Error("Required values: pin (2-255)");
        }
        board.once("ping-"+pinRec, function(data){board["ping-"+pinRec] = data;});
        var data =[0xF0, //START_SYSEX
            0xCA,  //Ping Command
            (pinSen >> 1) & 0x7F,
            (pinSen << 6) | (time1 & parseInt("011111",2)),
            (pinRec >> 1) & 0x7F,
            (pinRec << 6) | (time2 & parseInt("011111",2)),
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_ping2(pinRec)',
    function (pinRec) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        return (board["ping-"+pinRec] != null);
    }
);

SnapExtensions.primitives.set(
    's4a_ping3(pinRec)',
    function (pinRec) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var value = Math.round(board["ping-"+pinRec]/29.15/2);
        if (value == 0) return 1000;
        return value;
    }
);

SnapExtensions.primitives.set(
    's4a_nunchuk1(command)',
    function (command) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var cCode = 0xC0;
        // default command is joyX with value 0xC0
        if (command == "joyY") cCode = 0xC1;
        if (command == "butZ") cCode = 0xC2;
        if (command == "butC") cCode = 0xC3;
        if (command == "accX") cCode = 0xC4;
        if (command == "accY") cCode = 0xC5;
        if (command == "accZ") cCode = 0xC6;
        board[command] = null;
        board.once(command, function(data){board[command] = data;});
        var sdata =[0xF0,//START_SYSEX,
            cCode,//nunchuk command
            0xF7//END_SYSEX
        ];
        board.transport.write(world.Buffer(sdata));
    }
);

SnapExtensions.primitives.set(
    's4a_nunchuk2(command)',
    function (command) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        return (board[command] != null);
    }
);

SnapExtensions.primitives.set(
    's4a_nunchuk3(command)',
    function (command) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        return board[command];
    }
);

SnapExtensions.primitives.set(
    's4a_dht111(pin, param)',
    function (pin, param) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var sparam = 0;
        if (param == "temperature") sparam = 1;
        board["DHT11-"+pin+"-"+sparam] = null;
        if (pin === undefined || pin <= 1 || pin > 63) {
            throw new Error("Required values: pin (2-63)");
        }
        board.once("DHT11-"+pin+"-"+sparam, function(data){board["DHT11-"+pin+"-"+sparam] = data;});
        var data =[0xF0, //START_SYSEX
            0xCF,  //DHT11 Command
            ((pin << 1) |  sparam) & 0x7F,
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_dht112(pin, param)',
    function (pin, param) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var sparam = 0;
        if (param == "temperature") sparam = 1;
        return (board["DHT11-"+pin+"-"+sparam] != null);
    }
);

SnapExtensions.primitives.set(
    's4a_dht113(pin, param)',
    function (pin, param) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[5].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var sparam = 0;
        if (param == "temperature") sparam = 1;
        if (board["DHT11-"+pin+"-"+sparam] == 255) {
            return;
        } else {
            return board["DHT11-"+pin+"-"+sparam];
        }
    }
);

SnapExtensions.primitives.set(
    's4a_irsend(message, coder)',
    function (message, coder) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[6].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_ir firmware");
        }
        if (message === undefined || coder === undefined) {
            throw new Error("Message and coder are required");
        }
        var smessage = parseInt(message,16);
        smessage = smessage & parseInt("FFFFFF",16);
        if (coder == "RC5") {
            scoder = 1;
        } else {
            scoder = 0;
        }
        var data =[0xF0, //START_SYSEX
            0xCE,  //Send IR
            (smessage >> 17) & 0x7F,
            (smessage >> 10) & 0x7F,
            (smessage >> 3) & 0x7F,
            ((smessage << 4) & parseInt("01110000",2)) | (scoder & parseInt("01111",2)),
            0xF7  //END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_irenable(ac)',
    function (ac) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[6].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_ir firmware");
        }
        var dat;
        if (ac == "Enable") {
            dat = 0xCC;
        } else {
            dat = 0xCD;
        }
        var data =[0xF0,//START_SYSEX
            dat,//IR act/desact command
            0xF7//END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_irread1()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[6].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_ir firmware");
        }
        var value =1;
        board["IRrec"] = null;
        board.once("IRrec", function(data){board["IRrec"] = data;});
        var data =[0xF0,//START_SYSEX
            0xCB,//IR recv command
            0xF7//END_SYSEX
        ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_irread2()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[6].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_ir firmware");
        }
        return (board["IRrec"] != null);
    }
);

SnapExtensions.primitives.set(
    's4a_irread3()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) { ret
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[6].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running SA5Firmata_ir firmware");
        }
        return board["IRrec"].toString(16);
    }
);

SnapExtensions.primitives.set(
    's4a_neopixelConfig(pin, leds)',
    function (pin, leds) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[3].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running v6 of SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var data = [0xF0, //START_SYSEX
                   0xD0,  //NEOPIXEL REGISTER
                   parseInt(pin),
                   parseInt(leds),
                   0xF7  //END_SYSEX
                   ];
        board.transport.write(world.Buffer(data));
    }
);

SnapExtensions.primitives.set(
    's4a_neopixelLED(led, r, g, b)',
    function (led, r, g, b) {
        var stage = this.parentThatIsA(StageMorph);
        if (!(stage.s4aConnector && stage.s4aConnector.board && stage.s4aConnector.board.isReady)) {
            throw new Error('No board connected.');
        }
        var board = stage.s4aConnector.board;
        if (board.pins[3].supportedModes.indexOf(0x05) === -1) {
            throw new Error("This block needs a device running v6 of SA5Firmata_tone or SA5Firmata_ir firmware");
        }
        var data =[0xF0, //START_SYSEX
            0xD1,  //NEOPIXEL
            Math.sign(parseInt(led)),
            Math.abs(parseInt(led)),
            parseInt(r),
            parseInt(g),
            parseInt(b),
            0xF7  //END_SYSEX
            ];
        board.transport.write(world.Buffer(data));
    }
);
