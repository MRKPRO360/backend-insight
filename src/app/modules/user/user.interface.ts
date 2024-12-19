import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked?: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsById: (id: string) => Promise<IUser | null>;
  isPasswordMatched: (
    plainTextPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
