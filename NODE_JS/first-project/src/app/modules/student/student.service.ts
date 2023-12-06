import mongoose from 'mongoose';
import { TStudentType } from './student.interface';
import Student from './student.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import User from '../user/user.model';
import QueryBuilder from '../../builder/Querybuilder';
import { studentSearchableField } from './student.constant';

const createStudentIntoDB = async (studentData: TStudentType) => {
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save(); // build in instance method

  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  const result = await Student.create(studentData);

  return result;
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);
  // {email:{$regex: query.searchTerm, $options:i}}

  // const queryObj = { ...query };

  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // fitlering

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach(elem => delete queryObj[elem]);

  // const fitlerQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = fitlerQuery.sort(sort);

  // let page = 1;
  // let limit = 0;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // field limiting
  //   let fields = '-__v';

  //   if (query.fields) {
  //     fields = (query.fields as string).split(',').join(' ');
  //     console.log(fields);
  //   }

  //   const fieldsQuery = await limitQuery.select(fields);
  //   return fieldsQuery;

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

//
//
//
const getStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

//
//
//
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  // checking student exist or not
  if (!(await Student.isUserExists(id, ''))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist');
  }

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    // if student not deleted then throw an error
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    // if user not deleted then throw an error
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    (await session).abortTransaction();
    (await session).endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete');
  }
};

const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TStudentType>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /*
  guardian:{
  fatherOccupation:"Teacher"
  }
    guardian.fatherOccupation = 'Teacher'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  deleteStudentFromDb,
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentFromDb,
  updateStudentIntoDB,
};
