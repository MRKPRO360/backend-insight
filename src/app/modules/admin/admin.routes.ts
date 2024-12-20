import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import USER_ROLES from '../user/user.constant';

const router = express.Router();

router
  .route('/users/:userId/block')
  .patch(auth(USER_ROLES.admin), AdminControllers.blockUser);

router
  .route('/blogs/:id')
  .delete(auth(USER_ROLES.admin), AdminControllers.deleteBlog);

export const AdminRoutes = router;
