import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'student is created succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'student could not created',
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
