import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUserInDB = async (payload: IUser) => {
  return await User.create(payload);
};

const LoginUserFromDB = async (payload: ILogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) throw new AppError(400, 'This user does not exists!');

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (user && !isPasswordMatched)
    throw new AppError(403, 'Password does not match');

  if (user && user.isBlocked)
    throw new AppError(403, 'This user is not authorized!');

  // CREATING AND SENDING BACK TOKEN TO THE CLIENT

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUserInDB,
  LoginUserFromDB,
};
