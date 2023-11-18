import express from 'express';

import { studentController } from './student.controller';

const router = express.Router();

router.post('/create-student', studentController.createStudent);

router.get('/', studentController.getAllStudents);
export const studentRoute = router;
