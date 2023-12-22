import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created an offer course',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  //   const result;
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //       message: 'Successfully created an offer course',
  //     data:result
  //   });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  //   const result;
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //       message: 'Successfully created an offer course',
  //     data:result
  //   });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated an offer course',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
