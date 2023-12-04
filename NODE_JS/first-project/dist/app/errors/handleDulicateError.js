"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDupError = (err) => {
    // Extract value within double quotes using regex
    var _a;
    const match = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.match(/"([^"]*)"/);
    //   // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    //   console.log({ err: err.message });
    const errorSources = [
        {
            path: '',
            //   message: '',
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: '',
        errorSources,
    };
};
exports.default = handleDupError;
