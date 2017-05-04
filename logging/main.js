var Trace;

// Generates a random GUID to help us keep track of things across sessions
// Credit: http://stackoverflow.com/a/8809472/816458
function newGuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    return uuid;
}

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

// Setup
if (window.createLogger) {
    Trace = window.createLogger();
} else {
    Trace = new Logger(50);
}

window.onerror = function(msg, url, line, column, error) {
    Trace.logError({
        'message': msg,
        'fileName': url,
        'lineNumber': line,
        'columnNumber': column,
        'stack': error ? error.stack : null,
    });
};
