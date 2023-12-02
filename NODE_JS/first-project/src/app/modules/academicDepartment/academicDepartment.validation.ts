import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({ required_error: 'faculty is required' }),
  }),
});

const updatedAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Academic department must be string' })
      .optional(),
    academicFaculty: z
      .string({ required_error: 'faculty is required' })
      .optional(),
  }),
});
export const AcademicDepartmentValidations = {
  academicDepartmentValidationSchema,
  updatedAcademicDepartmentValidationSchema,
};
