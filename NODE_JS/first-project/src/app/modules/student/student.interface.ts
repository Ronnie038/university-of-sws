import { Model } from 'mongoose';

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
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  profileImg?: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGourdian;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}

// * for creating static method
export interface StudentModel extends Model<TStudentType> {
  isUserExists(id: string): Promise<TStudentType | null>;
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
