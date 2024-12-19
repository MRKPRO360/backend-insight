import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { user: userData } = req;

  const result = await AdminServices.blockUserInDB(
    userId,
    userData as JwtPayload,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User blocked successfully!',
    data: result,
  });
});

export const AdminControllers = {
  blockUser,
};
