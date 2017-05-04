// Logger classes

function Logger(interval) {
    this.init(interval);
}

Logger.prototype.serializer = new SnapSerializer();

Logger.prototype.init = function(interval) {
    this.queue = [];
    this.onCodeChanged = null;
    this.log('Logger.started');
    this.start(interval);
    this.forceLogCode = false;
    if (!Logger.sessionID) {
        Logger.sessionID = newGuid();
    }
};

// Get user identifying user info and bundle it as an object
Logger.prototype.userInfo = function() {
    var browserID = null;
    // browser ID stored in cache or local storage
    if (typeof(Storage) !== 'undefined' && localStorage) {
        browserID = localStorage.getItem('browserID');
        if (!browserID) {
            browserID = newGuid();
            localStorage.setItem('browserID', browserID);
        }
    }
    return {
        'sessionID': Logger.sessionID,
        'browserID': browserID,
    };
};

Logger.prototype.flushSaveCode = function() {
    // If we have a pending saveCode function, run it and cancel the callback
    if (this.saveCode) {
        this.saveCode();
        if (this.saveCodeTimeout) {
            clearTimeout(this.saveCodeTimeout);
            this.saveCodeTimeout = null;
        }
    }
};

/**
 * Logs a message. Depending on the logger being used, the message
 * may be output to the console or sent to be stored in a database.
 *
 * @this {Logger}
 * @param {string} message The message to be logged. This is usually
 * of the form '[Class].[action]', e.g. 'Logger.started', 'IDE.selectSprite'
 * or 'Block.snapped'
 * @param {object} data A javascript object to be logged in its entirety. Be
 * careful not to pass large objects here.
 * @param {boolean} saveImmediately If true, the code state will be saved
 * immediately. By default, the code is saved on the next frame, allowing
 * logging calls to capture code changes that occur immediately the logging
 * statement. For example, this allows a logging statement to come at the
 * beginning of a method which alters the code, and have that state change
 * still captured.
 * @param {boolean} forceLogCode Forces the logger to log the code state, even
 * if unchanged.
 */
Logger.prototype.log = function(message, data, saveImmediately, forceLogCode) {
    if (!(message || data)) return;

    this.flushSaveCode();

    var log = {
        'message': message,
        'data': data,
        'time': Date.now(),
    };

    this.forceLogCode |= forceLogCode;

    // Set a callback to save the code state in 1ms
    // This allows us to call log() at the beginning of a method
    // and save the code after it's finished executing
    // (or before the next log() call, per the code above)
    var myself = this;
    this.saveCode = function() {
        myself.saveCode = null;
        myself.addCode(log);
    };
    // If saveImmediately is true, we just run it now
    if (saveImmediately) {
        this.saveCode();
    } else {
        this.saveCodeTimeout = setTimeout(this.saveCode, 1);
    }

    this.queue.push(log);
};

// Log a message as an error
Logger.prototype.logErrorMessage = function(error) {
    if (!error || !error.length) return;
    var maxLength = 5000;
    if (error.length > maxLength) {
        error = error.substring(0, maxLength) + '...';
    }
    try {
        // Have to actually throw the error for .stack to show up on IE
        throw new Error(error);
    } catch (e) {
        this.logError(e);
    }
};

// Log a javascript error
Logger.prototype.logError = function(error) {
    if (!error) return;
    // eslint-disable-next-line no-console
    console.error(error);
    this.log('Error', {
        'message': error.message,
        'url': error.fileName,
        'line': error.lineNumber,
        'column': error.columnNumber,
        'stack': error.stack,
        'browser': this.getBrowser(),
    });
};

// Credit: http://stackoverflow.com/a/9851769/816458
Logger.prototype.getBrowser = function() {
    try {
        if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
            return 'Opera';
        }
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        if (typeof InstallTrigger !== 'undefined') return 'Firefox';
        // At least Safari 3+: '[object HTMLElementConstructor]'
        if (Object.prototype.toString.call(window.HTMLElement)
                .indexOf('Constructor') > 0) {
            return 'Safari';
        }
        // Chrome 1+
        if (window.chrome) return 'Chrome';
        // At least IE6
        if (/*@cc_on!@*/false || !!document.documentMode) return 'IE';
    } catch (e) {
        // empty
    }
    return null;
};

Logger.prototype.addCode = function(log) {
    var ide = world.children[0];
    if (typeof(ide) == 'undefined' || !ide.stage) return;
    log.projectID = ide.stage.guid;
    var code = this.serializer.serialize(ide.stage);
    code = this.removeImages(code);

    if (this.forceLogCode || this.hasCodeChanged(this.lastCode, code)) {
        this.forceLogCode = false;
        log.code = code;
        this.lastCode = code;
        if (this.onCodeChanged) this.onCodeChanged(code);
    }
};

Logger.prototype.removeCoordinates = function(xml) {
    if (!xml) return xml;
    // Remove the tags that have coordinates (and nothing else of interest)
    return xml.replace(/<(sprite|stage|watcher|script) [^>]*>/g, '');
};

Logger.prototype.hasCodeChanged = function(xml1, xml2) {
    // Remove coordinates before comparing code, since we don't need to
    // log these unimportant changes to the code state
    return this.removeCoordinates(xml1) !== this.removeCoordinates(xml2);
};

Logger.prototype.storeMessages = function(logs) {

};

/**
 * Stops the logger from posting messages.
 * Messages can still be logged and will post
 * when the logger is started.
 *
 * @this {Logger}
 */
Logger.prototype.stop = function() {
    clearInterval(this.storeCallback);
};

/**
 * Starts the logger. Messages will be posted
 * at the provided interval.
 *
 * @param {int} interval The interval at which to post
 * logged messages.
 */
Logger.prototype.start = function(interval) {
    if (!interval) return;
    var myself = this;
    this.storeCallback = setInterval(function() {
        if (myself.queue.length == 0) return;
        myself.flushSaveCode();
        myself.storeMessages(myself.queue);
        myself.queue = [];
    }, interval);
};

Logger.prototype.removeImages = function(xml) {
    if (!xml) return xml;
    // We don't want to log the stage image every time
    return xml.replace(/data:image\/png;base64[^<\"]*/g, '');
};
