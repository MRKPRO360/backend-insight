import BlogControllers from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidations from './blog.validation';
import express from 'express';
import auth from '../../middlewares/auth';
import USER_ROLES from '../user/user.constant';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.user),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createABlog,
  )
  .get(BlogControllers.getAllBlogs);

router
  .route('/:id')
  .get(BlogControllers.getABlog)
  .patch(
    auth(USER_ROLES.user),
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateABlog,
  )
  .delete(BlogControllers.deleteABlog);

export const BlogRoutes = router;
