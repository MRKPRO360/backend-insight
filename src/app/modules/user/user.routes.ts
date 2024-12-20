import express from 'express';
import auth from '../../middlewares/auth';
import USER_ROLES from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.route('/').get(auth(USER_ROLES.admin), UserControllers.getAllUsers);

export const UserRoutes = router;
