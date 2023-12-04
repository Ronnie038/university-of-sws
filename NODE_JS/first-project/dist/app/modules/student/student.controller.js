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
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cathAsync_1 = __importDefault(require("../../utils/cathAsync"));
// import studentValidationZodSchema from './student.zod.validation';
// import studentValidationSchema from './student.validation';
// * old aproach for handling try catch
// const createStudent: RequestHandler = async (req, res, next) => {
//   try {
//     // creating chema validation withing joi
//     //* validating data using joi validator
//     // const { error, value } = studentValidationSchema.validate(req.body);
//     // *----------====--------
//     // * validating data using zod validatior
//     // const parseZodData = studentValidationZodSchema.parse(req.body);
//     // *----------====--------
//     const student = req.body;
//     const result = await StudentServices.createStudentIntoDB(student);
//     res.status(200).json({
//       success: true,
//       message: 'student is created succesfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const getAllStudents = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_service_1.StudentServices.getAllStudentsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `${students.length} students retrieved successfully`,
        data: students,
    });
}));
const getSingleStudent = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.getStudentFromDb(studentId);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: `student does not exist or deleted`,
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `student does not exist or deleted`,
        data: result,
    });
}));
const updateStudent = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const { student } = req.body;
    const result = yield student_service_1.StudentServices.updateStudentIntoDB(studentId, student);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Student is updated successfully`,
        data: result,
    });
}));
const deleteSingleStudent = (0, cathAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.deleteStudentFromDb(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `student deleted successfully`,
        data: result,
    });
}));
exports.studentController = {
    // createStudent,
    updateStudent,
    getAllStudents,
    deleteSingleStudent,
    getSingleStudent,
};
