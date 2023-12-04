import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Department already exist');
//   }
//   next();
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findById(query._id);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The department does not exist ');
  }
  next();
});

const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

export default AcademicDepartment;
