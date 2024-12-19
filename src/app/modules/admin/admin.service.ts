import { JwtPayload } from 'jsonwebtoken';
import User from '../user/user.model';
import AppError from '../../errors/AppError';

const blockUserInDB = async (id: string, userData: JwtPayload) => {
  //CHECK IF THE ADMIN IS EXISTS
  const admin = await User.isUserExistsByEmail(userData.email);

  if (!admin)
    throw new AppError(403, 'You are not authorized to perform this action!');

  //CHECK IF THE USER IS EXISTS
  const user = await User.findById(id);

  if (!user) throw new AppError(400, 'This user does not exists!');

  //CHECK IF THE USER IS BLOCKED
  if (user && user.isBlocked)
    throw new AppError(403, 'This user is already blocked!');

  // FINAL UPDATE
  return await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const AdminServices = {
  blockUserInDB,
};
