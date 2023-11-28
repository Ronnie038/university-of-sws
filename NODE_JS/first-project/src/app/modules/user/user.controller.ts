import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student } = req.body;

    const result = await userServices.createStudentInDb(password, student);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
