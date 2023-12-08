"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
// import { number } from 'joi';
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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
}, { _id: false });
const guardianSchema = new mongoose_1.Schema({
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
}, { _id: false });
const localGourdianSchema = new mongoose_1.Schema({
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
}, { _id: false });
// |   main schema start here
const studentSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            validator: (value) => validator_1.default.isEmail(value),
        },
        required: true,
        unique: true,
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
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// virtual
// userSchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName}`;
// });
// * creating a custom method
studentSchema.statics.isUserExists = function (id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield Student.findOne({
            $or: [{ id: id }, { email: email }],
        });
        return existingUser;
    });
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
const Student = (0, mongoose_1.model)('Student', studentSchema);
exports.default = Student;
// | joi validation active
