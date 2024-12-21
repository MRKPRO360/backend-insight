"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const blog_controller_1 = __importDefault(require("./blog.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = __importDefault(require("./blog.validation"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = __importDefault(require("../user/user.constant"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)(user_constant_1.default.user), (0, validateRequest_1.default)(blog_validation_1.default.createBlogValidationSchema), blog_controller_1.default.createABlog)
    .get(blog_controller_1.default.getAllBlogs);
router
    .route('/:id')
    .get(blog_controller_1.default.getABlog)
    .patch((0, auth_1.default)(user_constant_1.default.user), (0, validateRequest_1.default)(blog_validation_1.default.updateBlogValidationSchema), blog_controller_1.default.updateABlog)
    .delete((0, auth_1.default)(user_constant_1.default.user), blog_controller_1.default.deleteABlog);
exports.BlogRoutes = router;
