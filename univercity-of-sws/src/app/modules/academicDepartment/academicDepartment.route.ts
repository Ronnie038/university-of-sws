import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidations.academicDepartmentValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicSemesterControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updatedAcademicDepartmentValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicDepartment,
);

router.get('/', AcademicSemesterControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
