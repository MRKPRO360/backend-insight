import { TErrSources, TGenericErrResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateErr = (err: any): TGenericErrResponse => {
  //   const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const errSources: TErrSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errSources,
  };
};

export default handleDuplicateErr;
