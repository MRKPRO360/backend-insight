"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastErr = (err) => {
    const errSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID!',
        errSources,
    };
};
exports.default = handleCastErr;
