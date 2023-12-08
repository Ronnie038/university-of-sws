"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userServices = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = __importDefault(require("./user.model"));
const academicSemester_model_1 = require("../academicSemister/academicSemester.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const createStudentInDb = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield student_model_1.default.isUserExists(payload.id, payload.email)) {
        throw new mongoose_1.Error('User already exists with this email');
    }
    // create a user object
    const userData = {};
    // if password is not given , use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = 'student';
    // find academic semester info
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // set generated id
        if (admissionSemester) {
            userData.id = yield (0, user_utils_1.generatedStudentId)(admissionSemester);
        }
        // create a user (transaction-1)
        const newUser = yield user_model_1.default.create([userData], { session });
        // create a student
        // if (Object.keys(newUser).length) {
        if (!newUser.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'faild to create user');
        }
        // set id, _id as userData
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; // reference _id
        // create a student (transaction-2)
        const newStudent = yield student_model_1.default.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'faild to create student 111');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new mongoose_1.Error(error);
    }
});
exports.userServices = {
    createStudentInDb,
};
