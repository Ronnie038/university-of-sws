"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidations.academicDepartmentValidationSchema), academicDepartment_controller_1.AcademicSemesterControllers.createAcademicDepartment);
router.get('/:departmentId', academicDepartment_controller_1.AcademicSemesterControllers.getSingleAcademicDepartment);
router.patch('/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidations.updatedAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicSemesterControllers.updateAcademicDepartment);
router.get('/', academicDepartment_controller_1.AcademicSemesterControllers.getAllAcademicDepartments);
exports.AcademicDepartmentRoutes = router;
