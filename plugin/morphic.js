WorldMorph.prototype.Arduino.firmata = firmata;

WorldMorph.prototype.Arduino.getSerialPorts = function (callback) {
    var myself = this,
    portList = [],
    portcheck = /usb|DevB|rfcomm|acm|^com/i;

    chrome.serial.getDevices(function (devices) { 
        devices.forEach(function (device) { 
            if (!myself.isPortLocked(device.path) && portcheck.test(device.path)) {
                portList[device.path] = device.path; 
            }
        });
        callback(portList);
    });
};

// Reverting some changes
WorldMorph.prototype.init = WorldMorph.prototype.originalInit;
