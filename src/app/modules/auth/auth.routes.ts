import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router
  .route('/register')
  .post(
    validateRequest(AuthValidations.registeredUserValidationSchema),
    AuthControllers.registerUser,
  );

router
  .route('/login')
  .post(
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser,
  );

export const AuthRoutes = router;
