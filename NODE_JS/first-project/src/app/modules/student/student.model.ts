import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  TGuardian,
  TLocalGourdian,
  StudentModel,
  TStudentType,
  TUserName,
} from './student.interface';

// import { number } from 'joi';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          const firstNameStr =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

          return value === firstNameStr;
        },
        message: '{VALUE} is not capitalized',
      },
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const localGourdianSchema = new Schema<TLocalGourdian>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// |   main schema start here
const studentSchema = new Schema<TStudentType, StudentModel>(
  {
    id: { type: String, unique: true },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: true,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid ',
      },
      required: true,
    },

    dateOfBirth: { type: Date },

    email: {
      type: String,
      validate: {
        validator: (value: string) => validator.isEmail(value),
      },
      required: true,
    },

    contactNo: { type: String, required: true },

    emergencyContactNo: { type: String, required: true },

    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid Blood Group!',
      },
      required: [true, 'please provide the bloodGroup'],
    },

    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },

    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGourdianSchema,
      required: true,
    },
    profileImg: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
// userSchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName}`;
// });
// * creating a custom method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

//|Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('aggregate', function (next) {
  // this.({ isDeleted: { $ne: true } });
  // * visualization of this pipeline logic
  //  [{$match:{isDeleted:{$ne:true}}},{$match:{id:'123456'}}]

  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// *creating a custom instacnce method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

const Student = model<TStudentType, StudentModel>('Student', studentSchema);

export default Student;

// | joi validation active
