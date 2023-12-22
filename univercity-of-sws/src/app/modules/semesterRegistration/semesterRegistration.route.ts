import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistraionValidations } from './semesterRegistration.validation';
import { semesterRegistraionControllers } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistraionValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistraionControllers.createSemesterRegistration,
);

router.get('/', semesterRegistraionControllers.getAllSemesterRegistration);

router.get(
  '/:id',
  semesterRegistraionControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistraionValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistraionControllers.updateSemesterRegistration,
);

export const semesterRegistraionRoutes = router;
