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

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user: userData } = req;

  await AdminServices.deleteBlogFromDB(id, userData as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog deleted successfully!',
    data: null,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
