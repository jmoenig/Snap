export const MODES = {
  INPUT: 0x00,
  OUTPUT: 0x01,
  ANALOG: 0x02,
  PWM: 0x03,
  SERVO: 0x04,
  SHIFT: 0x05,
  I2C: 0x06,
  ONEWIRE: 0x07,
  STEPPER: 0x08,
  SERIAL: 0x0a,
  PULLUP: 0x0b,
  IGNORE: 0x7f,
  PING_READ: 0x75,
  UNKOWN: 0x10,
};

export const STEPPER = {
  TYPE: {
    DRIVER: 1,
    TWO_WIRE: 2,
    THREE_WIRE: 3,
    FOUR_WIRE: 4,
  },
  STEP_SIZE: {
    WHOLE: 0,
    HALF: 1,
  },
  RUN_STATE: {
    STOP: 0,
    ACCEL: 1,
    DECEL: 2,
    RUN: 3,
  },
  DIRECTION: {
    CCW: 0,
    CW: 1,
  },
};
