import { ZodError, ZodIssue } from 'zod';
import { TErrSources, TGenericErrResponse } from '../interface/error';

const handleZodErr = (err: ZodError): TGenericErrResponse => {
  const errSources: TErrSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errSources,
  };
};

export default handleZodErr;
