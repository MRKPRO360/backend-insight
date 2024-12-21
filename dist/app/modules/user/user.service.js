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
exports.UserServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = __importDefault(require("./user.constant"));
const getAllUsersFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE ADMIN IS EXISTS
    const admin = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!admin)
        throw new AppError_1.default(403, 'User does not exist!');
    if (admin && admin.role !== user_constant_1.default.admin)
        throw new AppError_1.default(403, 'You are not authorized to perform this action');
    return yield user_model_1.default.find();
});
exports.UserServices = {
    getAllUsersFromDB,
};
