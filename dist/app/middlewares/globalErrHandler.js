"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const handleZodErr_1 = __importDefault(require("../errors/handleZodErr"));
const handleValidation_1 = __importDefault(require("../errors/handleValidation"));
const handleCastErr_1 = __importDefault(require("../errors/handleCastErr"));
const handleDuplicateErr_1 = __importDefault(require("../errors/handleDuplicateErr"));
const globalErrHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedErr = (0, handleZodErr_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errSources = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedErr = (0, handleValidation_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errSources = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedErr = (0, handleCastErr_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errSources = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedErr = (0, handleDuplicateErr_1.default)(err);
        statusCode = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.statusCode;
        message = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.message;
        errSources = simplifiedErr === null || simplifiedErr === void 0 ? void 0 : simplifiedErr.errSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    // FINAL RETURN
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errSources,
        err,
        stack: config_1.default.node_env === 'development' ? err.stack : null,
    });
};
exports.default = globalErrHandler;
