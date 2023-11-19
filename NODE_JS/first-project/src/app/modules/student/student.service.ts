import { TStudentType } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (studentData: TStudentType) => {
  // const result = await Student.create(studentData);
  const student = new Student(studentData); //create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save(); // build in instance method

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
