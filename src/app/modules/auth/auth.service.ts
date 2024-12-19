import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';

const registerUserInDB = async (payload: IUser) => {
  return await User.create(payload);
};

const LoginUserFromDB = async (payload: JwtPayload) => {};

export const AuthServices = {
  registerUserInDB,
  LoginUserFromDB,
};
