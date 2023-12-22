import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.mode';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import { Faculty } from '../Faculty/faculty.model';
import { Course } from '../Course/course.model';

import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  // check if the semester registration id is exists!
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'AcademicDepartment not found');
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'isAcademicFacultyExists not found',
    );
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const isCourse = await Course.findById(course);

  if (!isCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // check if the department is belong ot the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this ${isAcademicFacultyExists.name} is not belongs to ${isAcademicDepartmentExists.name} `,
    );
  }

  // check if the same course some section in same registered semester exists

  const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with secton is  already exists} `,
    );
  }

  // get the scedules of the efaculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newShedules = {
    startTime,
    endTime,
    days,
  };

  if (hasTimeConflict(assignedSchedules, newShedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time ! Choose other time of day',
    );
  }

  payload.academicSemester = isSemesterRegistrationExists.academicSemester;
  const result = await OfferedCourse.create(payload);
  return result;
};

// const getAllOfferedCourseFromDB = async (query: TOfferedCourse) => {};
// const getSingleOfferedCourseFromDB = async (id: string) => {};
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'startTime' | 'days' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'offeredCourse not found');
  }

  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  // get the scedules of the faculties

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Can't modify offered course in this ${semesterRegistrationStatus?.status} status`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newShedules = {
    startTime,
    endTime,
    days,
  };

  if (hasTimeConflict(assignedSchedules, newShedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at that time ! Choose other time of day',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  // getAllOfferedCourseFromDB,
  // getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
