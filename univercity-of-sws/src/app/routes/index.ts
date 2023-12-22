import { Router } from 'express';
import { studentRoute } from '../modules/student/student.route';

import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { UserRoutes } from '../modules/user/user.route';
import { semesterRegistraionRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/offeredCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistraionRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
];

// router.use('/students', studentRoute);
// router.use('/users', userRoutes);

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
