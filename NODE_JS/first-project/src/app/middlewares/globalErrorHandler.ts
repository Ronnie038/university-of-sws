/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = 'Something went wrong';

  // handling error if error comes from data validation
  if (err instanceof ZodError) {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'Data validation faild',
      error: err,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || message,
    error: err,
  });
};

export default globalErrorHandler;
