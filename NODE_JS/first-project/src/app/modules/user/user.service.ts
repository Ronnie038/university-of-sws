import config from '../../config';
import { TStudentType } from '../student/student.interface';
import { TUser } from './user.interface';
import Student from '../student/student.model';
import User from './user.model';

import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { generatedStudentId } from './user.utils';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    if (admissionSemester) {
      userData.id = await generatedStudentId(admissionSemester);
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // create a student
    // if (Object.keys(newUser).length) {
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user');
    }
    // set id, _id as userData
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student');
  }
};

export const userServices = {
  createStudentInDb,
};
