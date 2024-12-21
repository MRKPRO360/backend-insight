"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'A blog must have a title!',
            invalid_type_error: 'Blog title must be in string!',
        }),
        content: zod_1.z.string({
            required_error: 'A blog must have some content!',
            invalid_type_error: 'Blog content must be in string!',
        }),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'A blog must have a title!',
            invalid_type_error: 'Blog title must be in string!',
        })
            .optional(),
        content: zod_1.z
            .string({
            required_error: 'A blog must have some content!',
            invalid_type_error: 'Blog content must be in string!',
        })
            .optional(),
    }),
});
const BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
exports.default = BlogValidations;
