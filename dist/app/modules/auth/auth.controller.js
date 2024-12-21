"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.registerUserInDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'User registered successfully!',
        data: {
            _id: result === null || result === void 0 ? void 0 : result._id,
            name: result === null || result === void 0 ? void 0 : result.name,
            email: result === null || result === void 0 ? void 0 : result.email,
        },
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUserFromDB(req.body);
    const { refreshToken, accessToken } = result;
    // STORING REFRESHTOKEN IN COOKIES
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'User logged in successfully!',
        data: {
            token: accessToken,
        },
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshTokenFromDB(refreshToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'User logged in successfully!',
        data: result,
    });
}));
exports.AuthControllers = {
    registerUser,
    loginUser,
    refreshToken,
};
