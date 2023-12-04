"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoute = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_zod_validation_1 = require("./student.zod.validation");
const router = express_1.default.Router();
// router.post('/create-student', studentController.createStudent);
router.get('/', student_controller_1.studentController.getAllStudents);
router.get('/:studentId', student_controller_1.studentController.getSingleStudent);
router.patch('/:studentId', (0, validateRequest_1.default)(student_zod_validation_1.updateStudentValidationSchema), student_controller_1.studentController.updateStudent);
router.delete('/:studentId', student_controller_1.studentController.deleteSingleStudent);
exports.studentRoute = router;
