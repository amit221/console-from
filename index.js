const stackTrace = require('stack-trace');
const traceIndex = 2;
const path = require('path');

const dirname = path.resolve(__dirname);
const deletePath = dirname.substr(0, dirname.indexOf('node_modules'));

const addLocation = () => {
    const trace = stackTrace.get();
    if (trace.length < 3) {
        return;
    }
    const fileName = trace[traceIndex].getFileName();
    if (fileName === null) {
        return;
    }
    const currentFile = fileName.replace(deletePath, '');
    tempConsoleLog("\x1b[36m%s\x1b[0m", currentFile + ":" + trace[traceIndex].getLineNumber());


};


const tempConsoleError = console.error;

global.console.error = function (...args) {
    addLocation(args);
    tempConsoleError.apply(console, args);

};

const tempConsoleLog = console.log;

global.console.log = function (...args) {
    addLocation(args);
    tempConsoleLog.apply(console, args);
};
