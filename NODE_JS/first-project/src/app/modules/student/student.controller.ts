import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
// import studentValidationZodSchema from './student.zod.validation';
// import studentValidationSchema from './student.validation';

// * old aproach for handling try catch
// const createStudent: RequestHandler = async (req, res, next) => {
//   try {
//     // creating chema validation withing joi

//     //* validating data using joi validator
//     // const { error, value } = studentValidationSchema.validate(req.body);
//     // *----------====--------

//     // * validating data using zod validatior
//     // const parseZodData = studentValidationZodSchema.parse(req.body);
//     // *----------====--------

//     const student = req.body;

//     const result = await StudentServices.createStudentIntoDB(student);

//     res.status(200).json({
//       success: true,
//       message: 'student is created succesfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const students = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `${students.length} students retrieved successfully`,
    data: students,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentFromDb(studentId);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `student does not exist or deleted`,
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `student does not exist or deleted`,
    data: result,
  });
});

const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `student deleted successfully`,
    data: result,
  });
});

export const studentController = {
  // createStudent,
  getAllStudents,
  deleteSingleStudent,
  getSingleStudent,
};
