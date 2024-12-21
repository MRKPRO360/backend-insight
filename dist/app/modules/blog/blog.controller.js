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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = __importDefault(require("./blog.service"));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.default.getAllBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        result: result.length,
        message: 'Blogs fetched sucessfully!',
        data: result,
    });
}));
const getABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.default.getABlogFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog fetched sucessfully!',
        data: result,
    });
}));
const createABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userData } = req;
    const result = yield blog_service_1.default.createABlogInDB(req.body, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blogs created sucessfully!',
        data: result,
    });
}));
const updateABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userData } = req;
    const { id } = req.params;
    const result = yield blog_service_1.default.updateABlogInDB(id, userData, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog updated sucessfully!',
        data: result,
    });
}));
const deleteABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user: userData } = req;
    const result = yield blog_service_1.default.deleteABlogFromDB(id, userData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted sucessfully!',
        data: result,
    });
}));
const BlogControllers = {
    getAllBlogs,
    getABlog,
    updateABlog,
    createABlog,
    deleteABlog,
};
exports.default = BlogControllers;
