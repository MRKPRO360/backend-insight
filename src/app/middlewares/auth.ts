import config from '../config';
import AppError from '../errors/AppError';
import { IUserRoles } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: IUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // CHECK IF THE TOKEN IS EXISTS
    if (!token) throw new AppError(403, 'You are not authorized!');

    // CHECK IF THE TOKEN IS VALID
    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    const { role, email } = decoded as JwtPayload;

    //CHECK IF THE USER IS EXISTS
    const user = await User.isUserExistsByEmail(email);

    if (!user) throw new AppError(400, 'This user does not exists!');

    //CHECK IF THE USER IS BLOCKED
    if (user && user.isBlocked)
      throw new AppError(403, 'You are not authorized!');

    //CHECK IF THE USER ROLE IS CORRECT
    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(403, 'You are not authorized');

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
