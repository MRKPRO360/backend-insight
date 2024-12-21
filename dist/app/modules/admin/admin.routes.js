"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = __importDefault(require("../user/user.constant"));
const router = express_1.default.Router();
router
    .route('/users/:userId/block')
    .patch((0, auth_1.default)(user_constant_1.default.admin), admin_controller_1.AdminControllers.blockUser);
router
    .route('/blogs/:id')
    .delete((0, auth_1.default)(user_constant_1.default.admin), admin_controller_1.AdminControllers.deleteBlog);
exports.AdminRoutes = router;
