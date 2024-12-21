"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateErr = (err) => {
    //   const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const errSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errSources,
    };
};
exports.default = handleDuplicateErr;
