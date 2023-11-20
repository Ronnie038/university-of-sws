import { TStudentType } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (studentData: TStudentType) => {
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save(); // build in instance method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData);

  return result;
};

const getAllStudentsFromDB = async () => {
  const students = await Student.find({});
  return students;
};

const getStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });

  return result;
};

export const StudentServices = {
  deleteStudentFromDb,
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentFromDb,
};
