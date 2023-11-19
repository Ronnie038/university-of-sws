import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationZodSchema from './student.zod.validation';
// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating chema validation withing joi

    //* validating data using joi validator
    // const { error, value } = studentValidationSchema.validate(req.body);
    // *----------====--------

    // * validating data using zod validatior
    // const parseZodData = studentValidationZodSchema.parse(req.body);
    // *----------====--------

    const student = req.body;

    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'student could not created',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getAllStudentsFromDB();
    if (students.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'No Students Found',
      });
    }

    res.status(200).json({
      success: true,
      message: `${students.length} students found successfully`,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
};
