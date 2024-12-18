import { Router } from 'express';
import BlogControllers from './blog.controller';

const router = Router();

router
  .route('/blogs')
  .post(BlogControllers.createABlog)
  .get(BlogControllers.getAllBlogs);

router
  .route('/blogs/:id')
  .patch(BlogControllers.updateABlog)
  .delete(BlogControllers.deleteABlog);

export default router;
