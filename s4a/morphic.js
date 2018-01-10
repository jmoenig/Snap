WorldMorph.prototype.Arduino = Arduino;

WorldMorph.prototype.originalInit = WorldMorph.prototype.init;
WorldMorph.prototype.init = function (aCanvas, fillPage) {
    this.originalInit(aCanvas, fillPage);

    // We need to override reportVersion and queryFirmware so that, in the event that the
    // cable is unplugged during a connection attempt, it does not try to write to the serial.
    // For some reason, the chrome.serial API freezes the serial port forever otherwise.

    this.Arduino.firmata.prototype.originalReportVersion = this.Arduino.firmata.prototype.reportVersion;
    this.Arduino.firmata.prototype.reportVersion = function (callback) {
        if (this.transport.connectionId === undefined || this.transport.connectionId > 0) {
            this.originalReportVersion(callback);
        }
    };
    this.Arduino.firmata.prototype.originalQueryFirmware = this.Arduino.firmata.prototype.queryFirmware;
    this.Arduino.firmata.prototype.queryFirmware = function (callback) {
        if (this.transport.connectionId === undefined || this.transport.connectionId > 0) {
            this.originalQueryFirmware(callback);
        }
    };

};
