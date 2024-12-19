/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';
import USER_ROLES from './user.constant';

export type IUserRoles = keyof typeof USER_ROLES;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: IUserRoles;
  isBlocked?: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail: (email: string) => Promise<IUser | null>;
  isPasswordMatched: (
    plainTextPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
