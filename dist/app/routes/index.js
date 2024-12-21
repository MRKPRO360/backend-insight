"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_routes_1 = require("../modules/blog/blog.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/blogs',
        route: blog_routes_1.BlogRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
