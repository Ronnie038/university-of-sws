import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGourdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudentType {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  profileImg?: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGourdian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;

  isDeleted: boolean;
}

// * for creating static method
export interface StudentModel extends Model<TStudentType> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string, email: string): Promise<TStudentType | null>;
}

// * for creating instance method
// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudentType | null>;
// };

// export type StudentModel = Model<
//   TStudentType,
//   Record<string, never>,
//   StudentMethod
// >;
