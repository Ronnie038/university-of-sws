import { StudentType } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (student: StudentType) => {
  const result = await Student.create(student);

  return result;
};

const getAllStudentsFromDB = async () => {
  const students = await Student.find({});

  return students;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
};
