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
const blog_model_1 = __importDefault(require("./blog.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate('author'), query)
        .search(['title', 'content'])
        .filter()
        .sort()
        .paginate();
    return yield blogQuery.modelQuery;
});
const getABlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id).populate('author');
    if (!result)
        throw new AppError_1.default(400, 'This blog does not exists');
    return result;
});
const createABlogInDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE USER IS EXISTS
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user)
        throw new AppError_1.default(403, 'User does not exist!');
    return (yield blog_model_1.default.create(Object.assign(Object.assign({}, payload), { author: user._id }))).populate('author');
});
const updateABlogInDB = (id, userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE USER IS EXISTS
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user)
        throw new AppError_1.default(403, 'User does not exist!');
    //CHECK IF THE BLOG IS EXISTS
    const blog = yield blog_model_1.default.isBlogExistsById(id);
    if (!blog)
        throw new AppError_1.default(403, 'Blog does not exist!');
    // CHECK IF THE CURRENT BLOG USER IS THE AUTHOR OF THIS BLOG
    const isOwnBlog = blog.author.toString() === user._id.toString();
    if (!isOwnBlog)
        throw new AppError_1.default(403, "You don't have permission to update other blog!");
    return yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate('author');
});
const deleteABlogFromDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK IF THE USER IS EXISTS
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user)
        throw new AppError_1.default(403, 'User does not exist!');
    //CHECK IF THE BLOG IS EXISTS
    const blog = yield blog_model_1.default.isBlogExistsById(id);
    if (!blog)
        throw new AppError_1.default(403, 'Blog does not exist!');
    // CHECK IF THE CURRENT BLOG USER IS THE AUTHOR OF THIS BLOG
    const isOwnBlog = blog.author.toString() === user._id.toString();
    if (!isOwnBlog)
        throw new AppError_1.default(403, "You don't have permission to delete other blog!");
    yield blog_model_1.default.findByIdAndDelete(id);
    return null;
});
const BlogServices = {
    getAllBlogsFromDB,
    getABlogFromDB,
    updateABlogInDB,
    createABlogInDB,
    deleteABlogFromDB,
};
exports.default = BlogServices;
