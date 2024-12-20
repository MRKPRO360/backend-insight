import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const { user: userData } = req;

  const result = await UserServices.getAllUsersFromDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
};
