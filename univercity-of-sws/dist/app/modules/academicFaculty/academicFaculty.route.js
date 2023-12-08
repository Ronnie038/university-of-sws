"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidations.academicFacultyValidationSchema), academicFaculty_controller_1.AcademicSemesterControllers.createAcademicFaculty);
router.get('/:facultyId', academicFaculty_controller_1.AcademicSemesterControllers.getSingleAcademicFaculty);
router.patch('/:facultyId', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidations.updatedAcademicFacultyValidationSchema), academicFaculty_controller_1.AcademicSemesterControllers.updateAcademicFaculty);
router.get('/', academicFaculty_controller_1.AcademicSemesterControllers.getAllAcademicFaculties);
exports.AcademicFacultyRoutes = router;
