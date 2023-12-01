import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicSemesterControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicSemesterControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updatedAcademicFacultyValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicFaculty,
);

router.get('/', AcademicSemesterControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
