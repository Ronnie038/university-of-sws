import { NextFunction, Request, RequestHandler, Response } from 'express';

// * Dry principle for do not repeat yourself
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
};

export default catchAsync;
