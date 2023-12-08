import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic faculty bust be string' }),
  }),
});

const updatedAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic faculty bust be string' }),
  }),
});
export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
  updatedAcademicFacultyValidationSchema,
};
