import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'A blog must have a title!',
      invalid_type_error: 'Blog title must be in string!',
    }),
    content: z.string({
      required_error: 'A blog must have some content!',
      invalid_type_error: 'Blog content must be in string!',
    }),
    author: z.string({
      required_error: 'A blog musth have author reference!',
      invalid_type_error: 'Blog user reference must be in string!',
    }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'A blog must have a title!',
        invalid_type_error: 'Blog title must be in string!',
      })
      .optional(),
    content: z
      .string({
        required_error: 'A blog must have some content!',
        invalid_type_error: 'Blog content must be in string!',
      })
      .optional(),
    author: z
      .string({
        required_error: 'A blog musth have author reference!',
        invalid_type_error: 'Blog user reference must be in string!',
      })
      .optional(),
  }),
});

const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

export default BlogValidations;
