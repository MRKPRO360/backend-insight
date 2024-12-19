import mongoose from 'mongoose';
import { TErrSources, TGenericErrResponse } from '../interface/error';

const handleCastErr = (err: mongoose.Error.CastError): TGenericErrResponse => {
  const errSources: TErrSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID!',
    errSources,
  };
};

export default handleCastErr;
