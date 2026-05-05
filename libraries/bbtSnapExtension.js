
window.birdbrain = {};
window.birdbrain.sensorData = {};
window.birdbrain.sensorData.A = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
window.birdbrain.sensorData.B = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
window.birdbrain.sensorData.C = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
window.birdbrain.microbitIsV2 = {};
window.birdbrain.microbitIsV2.A = false;
window.birdbrain.microbitIsV2.B = false;
window.birdbrain.microbitIsV2.C = false;
window.birdbrain.currentBeak = {};
window.birdbrain.currentBeak.A = [0,0,0];
window.birdbrain.currentBeak.B = [0,0,0];
window.birdbrain.currentBeak.C = [0,0,0];
window.birdbrain.robotType = {
  FINCH: 1,
  HUMMINGBIRDBIT: 2,
  MICROBIT: 3,
  GLOWBOARD: 4,
  //connected robots default to type MICROBIT
  A: 3,
  B: 3,
  C: 3
};

//For the old style robots that connect over hid.
window.bbtLegacy = {};
window.bbtLegacy.sensorData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

console.log("setting up message channel")
window.birdbrain.messageChannel = new MessageChannel();
window.birdbrain.messageChannel.port1.onmessage = function (e) {
    //console.log("Got a message: ");
    //console.log(e.data);
    if (e.data.sensorData != null && e.data.robot != null) {
      let robot = e.data.robot;
      window.birdbrain.sensorData[robot] = e.data.sensorData;
      window.birdbrain.robotType[robot] = e.data.robotType;
      window.birdbrain.microbitIsV2[robot] = e.data.hasV2Microbit;
    }

    if (e.data.hidSensorData != null ) {
      window.bbtLegacy.sensorData = e.data.hidSensorData;
    }
}
window.parent.postMessage("hello from snap", "*", [window.birdbrain.messageChannel.port2]);

window.birdbrain.sendCommand = function(command) {
  window.parent.postMessage(command, "*");
}

//  Converts byte range 0 - 255 to -127 - 127 represented as a 32 bit signe int
function byteToSignedInt8 (byte) {
  var sign = (byte & (1 << 7));
  var value = byte & 0x7F;
  if (sign) { value  = byte | 0xFFFFFF00; }
  return value;
}

//  Converts byte range 0 - 255 to -127 - 127 represented as a 32 bit signe int
function byteToSignedInt16 (msb, lsb) {
  var sign = msb & (1 << 7);
  var value = (((msb & 0xFF) << 8) | (lsb & 0xFF));
  if (sign) {
    value = 0xFFFF0000 | value;  // fill in most significant bits with 1's
  }
  return value;
}

window.birdbrain.getMicrobitAcceleration = function(axis, robot) {
  const rawToMperS = 196/1280; //convert to meters per second squared
  let sensorData = window.birdbrain.sensorData[robot];
  let accVal = 0;
  switch (axis) {
    case 'X':
      accVal = byteToSignedInt8(sensorData[4]);
      break;
    case 'Y':
      accVal = byteToSignedInt8(sensorData[5]);
      break;
    case 'Z':
      accVal = byteToSignedInt8(sensorData[6]);
      break;
  }
  return (accVal * rawToMperS);
}

window.birdbrain.getMicrobitMagnetometer = function(axis, finch) {
  const rawToUT = 1/10; //convert to uT
  let sensorData = window.birdbrain.sensorData[finch];
  let msb = 0;
  let lsb = 0;
  switch (axis) {
    case 'X':
      msb = sensorData[8];
      lsb = sensorData[9];
      break;
    case 'Y':
      msb = sensorData[10];
      lsb = sensorData[11];
      break;
    case 'Z':
      msb = sensorData[12];
      lsb = sensorData[13];
      break;
  }
  let magVal = byteToSignedInt16(msb, lsb);
  return Math.round(magVal * rawToUT);
}

window.birdbrain.getFinchAcceleration = function(axis, finch) {
  let sensorData = window.birdbrain.sensorData[finch];
  let accVal = 0;
  switch (axis) {
    case 'X':
      accVal = byteToSignedInt8(sensorData[13]);
      break;
    case 'Y':
    case 'Z':
      const rawY = byteToSignedInt8(sensorData[14]);
      const rawZ = byteToSignedInt8(sensorData[15]);
      const rad = 40 * Math.PI / 180; //40° in radians

      switch(axis) {
        case 'Y':
          accVal = (rawY*Math.cos(rad) - rawZ*Math.sin(rad));
          break;
        case 'Z':
          accVal = (rawY*Math.sin(rad) + rawZ*Math.cos(rad));
          break;
      }
    }
    return (accVal * 196/1280);
}

window.birdbrain.getFinchMagnetometer = function(axis, finch) {
  let sensorData = window.birdbrain.sensorData[finch];
  switch (axis) {
    case 'X':
      return byteToSignedInt8(sensorData[17]);
    case 'Y':
    case 'Z':
      const rawY = byteToSignedInt8(sensorData[18]);
      const rawZ = byteToSignedInt8(sensorData[19]);
      const rad = 40 * Math.PI / 180 //40° in radians

      let magVal = 0;
      switch(axis) {
        case 'Y':
          magVal = (rawY*Math.cos(rad) + rawZ*Math.sin(rad));
          break;
        case 'Z':
          magVal = (rawZ*Math.cos(rad) - rawY*Math.sin(rad));
          break;
      }
      return Math.round(magVal);
  }
}




//// Motion Blocks ////

SnapExtensions.primitives.set(
  'bbt_bitpositionservo(robot, port, position)',
  function (robot, port, position) {
    position = Math.max(0, Math.min(180, position));
    position = Math.round(1.41 * position);//254/180 Scaling Factor

    var thisCommand = {
      robot: robot,
      cmd: "servo",
      port: port,
      value: position
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_bitrotationservo(robot, port, speed)',
  function (robot, port, speed) {
    speed = Math.max(-100, Math.min(100, speed));
    if (speed < 10 && speed > -10) {
      speed = 255;
    } else {
      speed = Math.round((speed * 23/100) + 122)
    }

    var thisCommand = {
      robot: robot,
      cmd: "servo",
      port: port,
      value: speed
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_finchismoving(robot)',
  function (robot) {
    return (window.birdbrain.sensorData[robot][4] > 127);
  }
);

SnapExtensions.primitives.set(
  'bbt_finchmove(robot, direction, distance, speed)',
  function (robot, direction, distance, speed) {
    distance = Math.max(-10000, Math.min(10000, distance));
    speed = Math.max(0, Math.min(100, speed));

    var thisCommand = {
      robot: robot,
      cmd: "move",
      direction: direction,
      distance: distance,
      speed: speed
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

SnapExtensions.primitives.set(
  'bbt_finchstop(robot)',
  function (robot) {
    var thisCommand = {
      robot: robot,
      cmd: "stopFinch"
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

SnapExtensions.primitives.set(
  'bbt_finchturn(robot, direction, angle, speed)',
  function (robot, direction, angle, speed) {
    angle = Math.max(-360000, Math.min(360000, angle));
    speed = Math.max(0, Math.min(100, speed));

    var thisCommand = {
      robot: robot,
      cmd: "turn",
      direction: direction,
      angle: angle,
      speed: speed
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

SnapExtensions.primitives.set(
  'bbt_finchwheels(robot, left, right)',
  function (robot, left, right) {
    left = Math.max(-100, Math.min(100, left));
    right = Math.max(-100, Math.min(100, right));

    var thisCommand = {
      robot: robot,
      cmd: "wheels",
      speedL: left,
      speedR: right
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

//// Looks Blocks ////

SnapExtensions.primitives.set(
  'bbt_display(robot, symbol)',
  function (robot, symbolString) {
    var thisCommand = {
      robot: robot,
      cmd: "symbol",
      symbolString: symbolString
    }

   window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_led(robot, port, intensity)',
  function (robot, port, intensity) {
    var thisCommand = {
      robot: robot,
      cmd: "led",
      port: port,
      intensity: Math.floor(Math.max(Math.min(intensity*2.55, 255), 0))
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_print(robot, string)',
  function (robot, string) {
    var thisCommand = {
      robot: robot,
      cmd: "print",
      printString: string
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_triled(robot, port, red, green, blue)',
  function (robot, port, red, green, blue) {
    var thisCommand = {
      robot: robot,
      cmd: "triled",
      port: port,
      red: Math.floor(Math.max(Math.min(red*2.55, 255), 0)),
      green: Math.floor(Math.max(Math.min(green*2.55, 255), 0)),
      blue: Math.floor(Math.max(Math.min(blue*2.55, 255), 0))
    }
    if (port == 1) {
      window.birdbrain.currentBeak[robot] = [thisCommand.red, thisCommand.green, thisCommand.blue];
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

//// Control Blocks ////

SnapExtensions.primitives.set(
  'bbt_stop(robot)',
  function (robot) {
    var thisCommand = {
      robot: robot,
      cmd: "stopAll"
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

//// Sound Blocks ////

SnapExtensions.primitives.set(
  'bbt_playnote(robot, note, duration)',
  function (robot, note, duration) {
    note = Math.round(Math.max(32, Math.min(135, note)));
    console.log("playing note " + note);

    var thisCommand = {
      robot: robot,
      cmd: "playNote",
      note: note,
      duration: duration
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

//// Sensing Blocks ////

SnapExtensions.primitives.set(
  'bbt_accelerometer(robot, dimension)',
  function (robot, dim) {
    let acc = window.birdbrain.getMicrobitAcceleration(dim, robot);
    return Math.round(acc * 10) / 10;
  }
);

SnapExtensions.primitives.set(
  'bbt_bitsensor(robot, sensor, port)',
  function (robot, sensor, port) {
    const distanceScaling = 117/100;
    const dialScaling = 100/230;
    const lightScaling = 100/255;
    const soundScaling = 200/255;
    const voltageScaling = 3.3/255;

    let value = window.birdbrain.sensorData[robot][port - 1];

    switch(sensor) {
      case "Distance (cm)":
        return Math.round(value * distanceScaling);
      case "Dial":
        if (value > 230) { value = 230; }
        return Math.round(value * dialScaling);
      case "Light":
        return Math.round(value * lightScaling);
      case "Sound":
        return Math.round(value * soundScaling);
      case "Other (V)":
        return Math.round(value * voltageScaling * 100) / 100;
      default:
        console.log("Unknown sensor: " + sensor);
        return 0;
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_button(robot, button)',
  function (robot, button) {
    const type = window.birdbrain.robotType[robot];
    const index = (type == window.birdbrain.robotType.FINCH) ? 16 : 7;
    var buttonState = window.birdbrain.sensorData[robot][index] & 0xF0; //Button Byte position = 7, clear LS Bits as it is for shake and calibrate

    switch (button) {
      case 'A':
        return (buttonState == 0x00 || buttonState == 0x20)
      case 'B':
        return (buttonState == 0x00 || buttonState == 0x10)
      case 'Logo (V2)':
        if(window.birdbrain.microbitIsV2[robot]) {
          return (((window.birdbrain.sensorData[robot][index] >> 1) & 0x1) == 0x0)
        } else {
          return "micro:bit V2 required";
        }
      default:
        console.log("unknown button " + button);
        return false;
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_compass(robot)',
  function (robot) {
    const ax = window.birdbrain.getMicrobitAcceleration('X', robot);
    const ay = window.birdbrain.getMicrobitAcceleration('Y', robot);
    const az = window.birdbrain.getMicrobitAcceleration('Z', robot);
    const mx = window.birdbrain.getMicrobitMagnetometer('X', robot);
    const my = window.birdbrain.getMicrobitMagnetometer('Y', robot);
    const mz = window.birdbrain.getMicrobitMagnetometer('Z', robot);

    const phi = Math.atan(-ay / az)
    const theta = Math.atan(ax / (ay * Math.sin(phi) + az * Math.cos(phi)))

    const xp = mx
    const yp = my * Math.cos(phi) - mz * Math.sin(phi)
    const zp = my * Math.sin(phi) + mz * Math.cos(phi)

    const xpp = xp * Math.cos(theta) + zp * Math.sin(theta)
    const ypp = yp

    const angle = 180.0 + ((Math.atan2(xpp, ypp)) * (180 / Math.PI)) //convert result to degrees

    return Math.round(angle)
  }
);

SnapExtensions.primitives.set(
  'bbt_finchaccelerometer(robot, dimension)',
  function (robot, dim) {
    let acc = window.birdbrain.getFinchAcceleration(dim, robot);
    return Math.round(acc * 10) / 10;
  }
);

SnapExtensions.primitives.set(
  'bbt_finchcompass(robot)',
  function (robot) {
    const ax = window.birdbrain.getFinchAcceleration('X', robot);
    const ay = window.birdbrain.getFinchAcceleration('Y', robot);
    const az = window.birdbrain.getFinchAcceleration('Z', robot);
    const mx = window.birdbrain.getFinchMagnetometer('X', robot);
    const my = window.birdbrain.getFinchMagnetometer('Y', robot);
    const mz = window.birdbrain.getFinchMagnetometer('Z', robot);

    const phi = Math.atan(-ay / az)
    const theta = Math.atan(ax / (ay * Math.sin(phi) + az * Math.cos(phi)))

    const xp = mx
    const yp = my * Math.cos(phi) - mz * Math.sin(phi)
    const zp = my * Math.sin(phi) + mz * Math.cos(phi)

    const xpp = xp * Math.cos(theta) + zp * Math.sin(theta)
    const ypp = yp

    const angle = 180.0 + ((Math.atan2(xpp, ypp)) * (180 / Math.PI)) //convert result to degrees

    return ((Math.round(angle) + 180) % 360) //turn so that beak points north
  }
);

SnapExtensions.primitives.set(
  'bbt_finchdistance(robot)',
  function (robot) {
    if (window.birdbrain.microbitIsV2[robot]) {
      return window.birdbrain.sensorData[robot][1];
    } else {
      const cmPerDistance = 0.0919;
      const msb = window.birdbrain.sensorData[robot][0];
      const lsb = window.birdbrain.sensorData[robot][1];

      const distance = msb << 8 | lsb;
      return Math.round(distance * cmPerDistance);
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_finchencoder(robot, port)',
  function (robot, port) {
    let TICKS_PER_ROTATION = 792
    var msb = 0;
    var ssb = 0;
    var lsb = 0;
    switch (port) {
      case 'Right':
        msb = window.birdbrain.sensorData[robot][10];
        ssb = window.birdbrain.sensorData[robot][11];
        lsb = window.birdbrain.sensorData[robot][12];
        break;
      case 'Left':
        msb = window.birdbrain.sensorData[robot][7];
        ssb = window.birdbrain.sensorData[robot][8];
        lsb = window.birdbrain.sensorData[robot][9];
        break;
      default:
        console.log("unknown encoder port " + port);
    }
    var encoder = msb << 16 | ssb << 8 | lsb
    if (encoder >= 0x800000) {
      encoder = encoder | 0xFF000000;
    }
    return Math.round( encoder * 10 / TICKS_PER_ROTATION ) / 10
  }
);

SnapExtensions.primitives.set(
  'bbt_finchencoderreset(robot)',
  function (robot) {
    var thisCommand = {
      robot: robot,
      cmd: "resetEncoders"
    }
    window.birdbrain.sendCommand(thisCommand)
  }
);

SnapExtensions.primitives.set(
  'bbt_finchlight(robot, port)',
  function (robot, port) {
    const beak = window.birdbrain.currentBeak[robot] || [0,0,0];
    const R = beak[0]*100/255;
    const G = beak[1]*100/255;
    const B = beak[2]*100/255;
    var raw = 0;
    var correction = 0;
    switch (port) {
      case 'Right':
        raw = window.birdbrain.sensorData[robot][3];
        correction = 6.40473070e-03*R + 1.41015162e-02*G + 5.05547817e-02*B + 3.98301391e-04*R*G + 4.41091223e-04*R*B + 6.40756862e-04*G*B + -4.76971242e-06*R*G*B;
        break;
      case 'Left':
        raw = window.birdbrain.sensorData[robot][2];
        correction = 1.06871493e-02*R + 1.94526614e-02*G + 6.12409825e-02*B + 4.01343475e-04*R*G + 4.25761981e-04*R*B + 6.46091068e-04*G*B + -4.41056971e-06*R*G*B;
        break;
      default:
        console.log("unknown light port " + port);
        return 0;
    }

    return Math.round(Math.max(0, Math.min(100, (raw - correction))));
  }
);

SnapExtensions.primitives.set(
  'bbt_finchline(robot, port)',
  function (robot, port) {
    var rawVal = 0;
    switch (port) {
      case 'Right':
        rawVal = window.birdbrain.sensorData[robot][5];
        break;
      case 'Left':
        rawVal = window.birdbrain.sensorData[robot][4];
        //first bit is for position control
        rawVal = (0x7F & rawVal)
        break;
      default:
        console.log("unknown line port " + port);
    }
    var returnVal = 100 - ((rawVal - 6) * 100/121);
    return Math.min(100, Math.max(0, Math.round(returnVal)));
  }
);

SnapExtensions.primitives.set(
  'bbt_finchmagnetometer(robot, dimension)',
  function (robot, dim) {
    return window.birdbrain.getFinchMagnetometer(dim, robot);
  }
);

SnapExtensions.primitives.set(
  'bbt_finchorientation(robot, dimension)',
  function (robot, dim) {
    if (dim == "Shake") {
      let shake = window.birdbrain.sensorData[robot][16];
      return ((shake & 0x01) > 0);
    }
    const threshold = 7.848;
    let acceleration = 0;
    switch(dim) {
      case "Tilt Left":
      case "Tilt Right":
        acceleration = window.birdbrain.getFinchAcceleration('X', robot);
        break;
      case "Beak Up":
      case "Beak Down":
        acceleration = window.birdbrain.getFinchAcceleration('Y', robot);
        break;
      case "Level":
      case "Upside Down":
        acceleration = window.birdbrain.getFinchAcceleration('Z', robot);
        break;
    }
    switch(dim) {
      case "Tilt Right":
      case "Beak Up":
      case "Upside Down":
        return (acceleration > threshold);
      case "Tilt Left":
      case "Beak Down":
      case "Level":
        return (acceleration < -threshold);
    }

    console.log("Unknown dimension " + dim);
    return false;
  }
);

SnapExtensions.primitives.set(
  'bbt_magnetometer(robot, dimension)',
  function (robot, dim) {
    return window.birdbrain.getMicrobitMagnetometer(dim, robot);
  }
);

SnapExtensions.primitives.set(
  'bbt_orientation(robot, dimension)',
  function (robot, dim) {
    if (dim == "Shake") {
      const index = 7;
      let shake = window.birdbrain.sensorData[robot][index];
      return ((shake & 0x01) > 0);
    }
    const threshold = 7.848;
    let acceleration = 0;
    switch(dim) {
      case "Tilt Left":
      case "Tilt Right":
        acceleration = window.birdbrain.getMicrobitAcceleration('X', robot);
        break;
      case "Logo Up":
      case "Logo Down":
        acceleration = window.birdbrain.getMicrobitAcceleration('Y', robot);
        break;
      case "Screen Up":
      case "Screen Down":
        acceleration = window.birdbrain.getMicrobitAcceleration('Z', robot);
        break;
    }
    switch(dim) {
      case "Tilt Left":
      case "Logo Down":
      case "Screen Down":
        return (acceleration > threshold);
      case "Tilt Right":
      case "Logo Up":
      case "Screen Up":
        return (acceleration < -threshold);
    }

    console.log("Unknown dimension " + dim);
    return false;
  }
);

SnapExtensions.primitives.set(
  'bbt_sound(robot)',
  function (robot) {
    if (window.birdbrain.microbitIsV2[robot]) {
      const type = window.birdbrain.robotType[robot];
      if (type == window.birdbrain.robotType.FINCH) {
        return window.birdbrain.sensorData[robot][0];
      } else {
        return window.birdbrain.sensorData[robot][14];
      }
    } else {
      return "micro:bit V2 required"
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_temperature(robot)',
  function (robot) {
    if (window.birdbrain.microbitIsV2[robot]) {
      const type = window.birdbrain.robotType[robot];
      if (type == window.birdbrain.robotType.FINCH) {
        return (window.birdbrain.sensorData[robot][6] >> 2);
      } else {
        return window.birdbrain.sensorData[robot][15];
      }
    } else {
      return "micro:bit V2 required"
    }
  }
);

//// GlowBoard Blocks ////

SnapExtensions.primitives.set(
  'bbt_gbbutton(robot, button)',
  function (robot, button) {
    var buttonState = window.birdbrain.sensorData[robot][5] & 0xF0; //Button Byte position = 7, clear LS Bits as it is for shake and calibrate

    switch (button) {
      case 'right':
        return (buttonState == 0x00 || buttonState == 0x20)
      case 'left':
        return (buttonState == 0x00 || buttonState == 0x10)
      default:
        console.log("unknown button " + button);
        return false;
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_gbdial(robot, dial)',
  function (robot, sensor) {
    let index = 1
    if (sensor == "Right") { index = 3 }
    const msb = window.birdbrain.sensorData[robot][index];
    const lsb = window.birdbrain.sensorData[robot][index + 1];
    const value = msb << 8 | lsb;
    return value;
  }
);

SnapExtensions.primitives.set(
  'bbt_gbdisplay(robot, color, brightness, symbol)',
  function (robot, color, brightness, symbolString) {
    var thisCommand = {
      robot: robot,
      cmd: "glowboard",
      color: color,
      brightness: brightness,
      symbolString: symbolString
    }

   window.birdbrain.sendCommand(thisCommand);
  }
);

SnapExtensions.primitives.set(
  'bbt_gbsetpoint(robot, X, Y, color, brightness)',
  function (robot, xPos, yPos, color, brightness) {
    var thisCommand = {
      robot: robot,
      cmd: "setPoint",
      xPos: Math.round(Math.max(Math.min(xPos, 12), 1)),
      yPos: Math.round(Math.max(Math.min(yPos, 12), 1)),
      color: color,
      brightness: brightness
    }

    window.birdbrain.sendCommand(thisCommand);
  }
);

//// Blocks for old style robots ////

SnapExtensions.primitives.set(
  'bbt_legacyled(port, intensity)',
  function (portnum, intensitynum) {
    var realPort = portnum-1;
    var realIntensity = Math.floor(intensitynum*2.55);

    var report = {
      message:"L".charCodeAt(0),
      port: realPort.toString().charCodeAt(0),
      intensity: realIntensity
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacytriled(port, red, green, blue)',
  function (portnum, rednum, greennum, bluenum) {
    var realPort = portnum-1;
    var realIntensities = [rednum, greennum, bluenum].map(function(intensity) {
      return Math.floor(Math.max(Math.min(intensity*2.55, 255), 0));
    });

    var report = {
      message:"O".charCodeAt(0),
      port: realPort.toString().charCodeAt(0),
      red: realIntensities[0],
      green: realIntensities[1],
      blue: realIntensities[2]
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyservo(port, position)',
  function (portnum, ang) {
    var realPort = portnum-1;
    var realAngle = Math.floor(ang*1.25);
    realAngle = Math.max(Math.min(realAngle,225.0),0.0);

    var report = {
      message: "S".charCodeAt(0),
      port: realPort.toString().charCodeAt(0),
      angle: realAngle
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacymotor(port, speed)',
  function (portnum, velocity) {
    var realPort = portnum-1;
    var realVelocity = Math.floor(velocity*2.55);
    realVelocity = Math.max(Math.min(realVelocity,255), -255);

    var report = {
        message: "M".charCodeAt(0),
        port: realPort.toString().charCodeAt(0),
        direction: (realVelocity < 0 ? 1 : 0).toString().charCodeAt(0),
        velocity: Math.abs(realVelocity)
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyvibration(port, intensity)',
  function (portnum, intensitynum) {
    var realPort = portnum-1;
    var realIntensity = Math.floor(intensitynum*2.55);
    realIntensity = Math.max(Math.min(realIntensity,255.0),0.0);

    var report = {
      message: "V".charCodeAt(0),
      port: realPort.toString().charCodeAt(0),
      intensity: realIntensity
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacysaythis(phrase)',
  function (phrase) {
    var report = { message: "SPEAK", val: phrase};
    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyhbsensor(sensor, port)',
  function (sensor, port) {
    var realport = port - 1;
    var sensorvalue = window.bbtLegacy.sensorData[realport]

    switch(sensor) {
      case "Light":
        return parseInt(sensorvalue / 2.55);
      case "Temperature": //Celsius
        return Math.floor(((sensorvalue-127)/2.4+25)*100/100);
      case "Distance": //cm
        var reading = sensorvalue*4;
        if (reading < 130) {
          sensorvalue = 100;
        } else { //formula based on mathematical regression
          reading = reading - 120;
          var distance;
          if (reading > 680) {
            distance = 5.0;
          } else {
            var sensor_val_square = reading*reading;
            distance = sensor_val_square*sensor_val_square*reading*-0.000000000004789
              + sensor_val_square*sensor_val_square*0.000000010057143
              - sensor_val_square*reading*0.000008279033021
              + sensor_val_square*0.003416264518201
              - reading*0.756893112198934
              + 90.707167605683000;
           }
          sensorvalue = parseInt(distance);
        }
        return sensorvalue;
      case "Dial":
        return parseInt(sensorvalue / 2.55);
      case "Sound":
        if (sensorvalue > 14) {
          return (sensorvalue - 15) * 3/2
        } else {
          return 0
        }
      case "Raw":
        return parseInt(sensorvalue / 2.55);
      default:
        console.log("Unknown sensor: " + sensor);
        return 0;
    }
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyfinchmove(left, right)',
  function (left, right) {
    function constrain(n) {
      return Math.max(Math.min(n, 255), -255);
    }
    var speeds = [constrain(Math.round(left * 2.55)), constrain(Math.round(right * 2.55))];

    var report = {
      message: "M".charCodeAt(0),
      leftDirection: speeds[0] < 0 ? 1 : 0,
      leftSpeed: Math.abs(speeds[0]),
      rightDirection: speeds[1] < 0 ? 1 : 0,
      rightSpeed: Math.abs(speeds[1]),
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyfinchled(red, green, blue)',
  function (red, green, blue) {
    // constrain n to the range [0..255]
    function constrain(n) {
      return Math.max(Math.min(n, 255), 0);
    }

    var values = [constrain(Math.round(red * 2.55)), constrain(Math.round(green * 2.55)), constrain(Math.round(blue * 2.55))];

    var report = {
      message: "O".charCodeAt(0),
      red: values[0],
      green: values[1],
      blue: values[2]
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyfinchbuzzer(frequency, duration)',
  function (freq, time) {
    //constrain n to the range [0..65535]
    function constrain(n) {
      return Math.max(Math.min(n, 0xFFFF), 0);
    }
    var value = {
      freq: constrain(Math.round(freq)),
      time: constrain(Math.round(time))
    };

    var report = {
      message: "B".charCodeAt(0),
      timeHigh: value.time >> 8, // Since the report must be in bytes
      timeLow: value.time & 0xFF, // and these values are bigger than a byte
      freqHigh: value.freq >> 8, // they are split into two bytes
      freqLow: value.freq & 0xFF
    };

    window.birdbrain.sendCommand( report );
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyfinchsensor(port)',
  function (port) {
    //Ports: Left Light = 0; Right Light = 1;
    // Acceleration (X, Y, Z) = (2, 3, 4);
    // Left Obstacle = 5; Right Obstacle = 6;
    // Temperature C = 7;
    return window.bbtLegacy.sensorData[port];
  }
);

SnapExtensions.primitives.set(
  'bbt_legacyfinchorientation()',
  function () {
    var acceleration = Array(3);
    acceleration[0] = window.bbtLegacy.sensorData[2]
    acceleration[1] = window.bbtLegacy.sensorData[3]
    acceleration[2] = window.bbtLegacy.sensorData[4]

    var orientation;

    if(acceleration[0] > -0.5 && acceleration[0] < 0.5 && acceleration[1] < 0.5 && acceleration[1] > -0.5 && acceleration[2] > 0.65 && acceleration[2] < 1.5)
      orientation = "level";
    else if(acceleration[0] > -0.5 && acceleration[0] < 0.5 && acceleration[1] < 0.5 && acceleration[1] > -0.5 && acceleration[2] > -1.5 && acceleration[2] < -0.65)
      orientation = "upside down";
    else if(acceleration[0] < 1.5 && acceleration[0] > 0.8 && acceleration[1] > -0.3 && acceleration[1] < 0.3 && acceleration[2] > -0.3 && acceleration[2] < 0.3)
      orientation = "beak down";
    else if(acceleration[0] < -0.8 && acceleration[0] > -1.5 && acceleration[1] > -0.3 && acceleration[1] < 0.3 && acceleration[2] > -0.3 && acceleration[2] < 0.3)
      orientation = "beak up";
    else if(acceleration[0] > -0.5 && acceleration[0] < 0.5 && acceleration[1] > 0.7 && acceleration[1] < 1.5 && acceleration[2] > -0.5 && acceleration[2] < 0.5)
      orientation = "left wing down";
    else if(acceleration[0] > -0.5 && acceleration[0] < 0.5 && acceleration[1] > -1.5 && acceleration[1] < -0.7 && acceleration[2] > -0.5 && acceleration[2] < 0.5)
      orientation = "right wing down";
    else
      orientation = "in between";

    return orientation
  }
);
