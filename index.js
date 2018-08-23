const stackTrace = require('stack-trace');

const traceIndex = 2;

const addLocation = (args) => {
    const trace = stackTrace.get();
    if(trace.length < 3){
        return args
    }
    return args.map(val => {
        if (typeof val === 'string') {
            return trace[traceIndex].getFileName() + ":" + trace[traceIndex].getLineNumber() + "\n" + val;
        }
        else if (typeof val === 'object' && Array.isArray(val) === false && val !== null  ) {
            if(val instanceof Error === false ){

                const clone = JSON.parse(JSON.stringify(val));
                clone.consoleFrom = trace[traceIndex].getFileName() + ":" + trace[traceIndex].getLineNumber();
                return clone;
            }
            else{
                val.consoleFrom =  trace[traceIndex].getFileName() + ":" + trace[traceIndex].getLineNumber();
            }

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
