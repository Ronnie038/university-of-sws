import express from 'express';

import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

// router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
);

router.delete('/:id', studentController.deleteSingleStudent);

export const studentRoute = router;
