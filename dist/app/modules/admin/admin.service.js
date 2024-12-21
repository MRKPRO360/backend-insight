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
exports.AdminServices = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const blockUserInDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE ADMIN IS EXISTS
    const admin = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!admin)
        throw new AppError_1.default(403, 'User does not exist!');
    //CHECK IF THE USER IS EXISTS
    const user = yield user_model_1.default.findById(id);
    if (!user)
        throw new AppError_1.default(400, 'This user does not exists!');
    //CHECK IF THE USER IS BLOCKED
    if (user && user.isBlocked)
        throw new AppError_1.default(403, 'This user is already blocked!');
    // FINAL UPDATE
    return yield user_model_1.default.findByIdAndUpdate(id, {
        isBlocked: true,
    }, {
        new: true,
        runValidators: true,
    });
});
const deleteBlogFromDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE ADMIN IS EXISTS
    const admin = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!admin)
        throw new AppError_1.default(403, 'User does not exist!');
    //CHECK IF THE BLOG IS EXISTS
    const blog = yield blog_model_1.default.isBlogExistsById(id);
    if (!blog)
        throw new AppError_1.default(400, 'This blog does not exists!');
    // FINAL DELETE
    return yield blog_model_1.default.findByIdAndDelete(id);
});
exports.AdminServices = {
    blockUserInDB,
    deleteBlogFromDB,
};
