import config from '../../config';
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
  const result = await AuthServices.loginUserFromDB(req.body);

  const { refreshToken, accessToken } = result;

  // STORING REFRESHTOKEN IN COOKIES
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User logged in successfully!',
    data: {
      token: accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshTokenFromDB(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User logged in successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
