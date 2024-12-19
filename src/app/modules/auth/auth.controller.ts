import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserInDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully!',
    data: {
      _id: result?._id,
      name: result?.name,
      email: result?.email,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.LoginUserFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
