import config from '../../config';
import { TStudentType } from '../student/student.interface';
import { TUser } from './user.interface';
import Student from '../student/student.model';
import User from './user.model';

import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { generatedStudentId } from './user.utils';

const createStudentInDb = async (password: string, payload: TStudentType) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set manually generated id
  if (admissionSemester) {
    userData.id = await generatedStudentId(admissionSemester);
  }

  // create a userData
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as userData
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id
  }
  const newStudent = await Student.create(payload);

  return newStudent;
};

export const userServices = {
  createStudentInDb,
};
