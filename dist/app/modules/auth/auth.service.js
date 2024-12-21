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
exports.AuthServices = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(payload);
});
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE USER IS EXISTS
    const user = yield user_model_1.default.isUserExistsByEmail(payload.email);
    if (!user)
        throw new AppError_1.default(401, 'Invalid credentials!');
    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (user && !isPasswordMatched)
        throw new AppError_1.default(401, 'Invalid credentials!');
    //CHECK IF THE USER IS BLOCKED
    if (user && user.isBlocked)
        throw new AppError_1.default(403, 'This user is not authorized!');
    // CREATING AND SENDING TOKEN BACK  TO THE CLIENT
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield user_model_1.default.isUserExistsByEmail(email);
    if (!user)
        throw new AppError_1.default(404, 'This user is not found!');
    if (user && user.isBlocked === true)
        throw new AppError_1.default(403, 'Unauthorized user!');
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { accessToken };
});
exports.AuthServices = {
    registerUserInDB,
    loginUserFromDB,
    refreshTokenFromDB,
};
