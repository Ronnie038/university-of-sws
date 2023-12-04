/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodErr from '../errors/handleZodeError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDupError from '../errors/handleDulicateError';
import { AppError } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // handling error if error comes from Zod data validation

  if (err instanceof ZodError) {
    const simplifiedError = handleZodErr(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDupError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    // const simplifiedError = handleDupError(err);
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    // const simplifiedError = handleDupError(err);

    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate error return

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.NODE_ENV === 'development' && err?.stack,
    err,
  });
};

export default globalErrorHandler;

// pattern

/*
success
message
errorSourcess:{
  path:'',
  message:'',

}

stack:{}
 */
