import BlogControllers from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidations from './blog.validation';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createABlog,
  )
  .get(BlogControllers.getAllBlogs);

router
  .route('/:id')
  .patch(
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateABlog,
  )
  .delete(BlogControllers.deleteABlog);

export const BlogRoutes = router;
