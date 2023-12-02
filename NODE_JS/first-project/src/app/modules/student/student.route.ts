import express from 'express';

import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

// router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudents);

router.get('/:studentId', studentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
);

router.delete('/:studentId', studentController.deleteSingleStudent);

export const studentRoute = router;
