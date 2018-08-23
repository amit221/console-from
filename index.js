const stackTrace = require('stack-trace');

const addLocation = (...args) => {
    const trace = stackTrace.get();
    return args.map(val => {
        if (typeof val === 'string') {
            val += trace[1].getFileName() + " line:" + trace[1].getLineNumber();
        }
        else if (typeof val === 'object' && Array.isArray(val) === false && val !== null) {
            val.consoleTrace = trace[1].getFileName() + " line:" + trace[1].getLineNumber();
        }
        return val;
    });
};


const tempConsoleError = console.error;

global.console.error = function (...args) {
    args = addLocation(args);
    tempConsoleError.apply(console, args);

};

const tempConsoleLog = console.log;

global.console.log = function (...args) {
    args = addLocation(args);
    tempConsoleLog.apply(console, args);
};
