import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const registerUserInDB = async (payload: IUser) => {
  return await User.create(payload);
};

const loginUserFromDB = async (payload: ILogin) => {
  //CHECK IF THE USER IS EXISTS
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) throw new AppError(401, 'Invalid credentials!');

  //CHECK IF THE PASSWORD IS CORRECT
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (user && !isPasswordMatched)
    throw new AppError(401, 'Invalid credentials!');

  //CHECK IF THE USER IS BLOCKED
  if (user && user.isBlocked)
    throw new AppError(403, 'This user is not authorized!');

  // CREATING AND SENDING TOKEN BACK  TO THE CLIENT
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

const refreshTokenFromDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExistsByEmail(email);

  if (!user) throw new AppError(404, 'This user is not found!');

  if (user && user.isBlocked === true)
    throw new AppError(403, 'Unauthorized user!');

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthServices = {
  registerUserInDB,
  loginUserFromDB,
  refreshTokenFromDB,
};
