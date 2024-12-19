import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import config from '../config';
import { TErrSources } from '../interface/error';
import handleZodErr from '../errors/handleZodErr';
import handleValidationError from '../errors/handleValidation';
import handleCastErr from '../errors/handleCastErr';
import handleDuplicateErr from '../errors/handleDuplicateErr';

const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errSources: TErrSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErr = handleZodErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedErr = handleValidationError(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.name === 'CastError') {
    const simplifiedErr = handleCastErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.code === 11000) {
    const simplifiedErr = handleDuplicateErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // FINAL RETURN
  return res.status(statusCode).json({
    success: false,
    message,
    errSources,
    err,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};

export default globalErrHandler;
