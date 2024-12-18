import { Router } from 'express';
import BlogControllers from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidations from './blog.validation';

const router = Router();

router
  .route('/blogs')
  .post(
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createABlog,
  )
  .get(BlogControllers.getAllBlogs);

router
  .route('/blogs/:id')
  .patch(
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateABlog,
  )
  .delete(BlogControllers.deleteABlog);

export default router;
