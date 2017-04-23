// Log to the console

ConsoleLogger.prototype = Object.create(Logger.prototype);

function ConsoleLogger(interval) {
    Logger.call(this, interval);
}

ConsoleLogger.prototype.storeMessages = function(logs) {
    var myself = this;
    logs.forEach(function(log) {
        log.userInfo = myself.userInfo();
        // eslint-disable-next-line no-console
        console.log(log);
    });
};