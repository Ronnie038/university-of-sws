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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("./student.model"));
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const Querybuilder_1 = __importDefault(require("../../builder/Querybuilder"));
const student_constant_1 = require("./student.constant");
const createStudentIntoDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // const student = new Student(studentData); //create an instance
    // if (await student.isUserExists(studentData.id)) {
    //   throw new Error('User already exists');
    // }
    // const result = await student.save(); // build in instance method
    // if (await Student.isUserExists(studentData.id)) {
    //   throw new Error('User already exists');
    // }
    const result = yield student_model_1.default.create(studentData);
    return result;
});
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    const studentQuery = new Querybuilder_1.default(student_model_1.default.find(), query)
        .search(student_constant_1.studentSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
//
//
//
const getStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Student.findOne({ id });
    // const result = await Student.aggregate([{ $match: { id: id } }]);
    const result = yield student_model_1.default.findOne({ id })
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
});
//
//
//
const deleteStudentFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    // checking student exist or not
    if (!(yield student_model_1.default.isUserExists(id, ''))) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Student does not exist');
    }
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        // if student not deleted then throw an error
        if (!deletedStudent) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'faild to delete student');
        }
        const deletedUser = yield user_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        // if user not deleted then throw an error
        if (!deletedUser) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'failed to delete user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        (yield session).abortTransaction();
        (yield session).endSession();
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Faild to delete');
    }
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
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
    const result = yield student_model_1.default.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.StudentServices = {
    deleteStudentFromDb,
    createStudentIntoDB,
    getAllStudentsFromDB,
    getStudentFromDb,
    updateStudentIntoDB,
};
