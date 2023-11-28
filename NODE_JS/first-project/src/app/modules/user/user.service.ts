import config from '../../config';
import { TStudentType } from '../student/student.interface';
import { TUser } from './user.interface';
import Student from '../student/student.model';
import User from './user.model';

const createStudentInDb = async (
  password: string,
  studentData: TStudentType,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // set manually generated id
  userData.id = '20300001';

  // create a userData
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as userData
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id
  }
  const newStudent = await Student.create(studentData);

  return newStudent;
};

export const userServices = {
  createStudentInDb,
};
