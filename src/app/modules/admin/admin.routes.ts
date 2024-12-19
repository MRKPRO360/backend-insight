import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import USER_ROLES from '../user/user.constant';

const router = express.Router();

router
  .route('/users/:userId/block')
  .patch(auth(USER_ROLES.admin), AdminControllers.blockUser);

export const AdminRoutes = router;
