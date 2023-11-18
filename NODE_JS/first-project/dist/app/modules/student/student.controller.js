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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body;
        const result = yield student_service_1.StudentServices.createStudentIntoDB(student);
        res.status(200).json({
            success: true,
            message: 'student is created succesfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'student could not created',
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_service_1.StudentServices.getAllStudentsFromDB();
        if (students.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'No Students Found',
            });
        }
        res.status(200).json({
            success: true,
            message: `${students.length} students found successfully`,
            data: students,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
        });
    }
});
exports.studentController = {
    createStudent,
    getAllStudents,
};
