import { Router } from 'express';
import { studentRoute } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemester.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

// router.use('/students', studentRoute);
// router.use('/users', userRoutes);

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
