import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDupError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex

  const match = err?.message?.match(/"([^"]*)"/);

  //   // The extracted value will be in the first capturing group

  const extractedMessage = match && match[1];
  //   console.log({ err: err.message });
  const errorSources: TErrorSources = [
    {
      path: '',
      //   message: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: '',
    errorSources,
  };
};

export default handleDupError;
