import { TErrSources, TGenericErrResponse } from '../interface/error';

const handleDuplicateErr = (err: any): TGenericErrResponse => {
  const match = err.message.match(/"([^]*)"/);
  const extractedMessage = match && match[1];

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
