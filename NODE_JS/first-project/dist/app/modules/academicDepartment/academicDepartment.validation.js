"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidations = void 0;
const zod_1 = require("zod");
const academicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Academic department must be string',
            required_error: 'Name is required',
        }),
        academicFaculty: zod_1.z.string({ required_error: 'faculty is required' }),
    }),
});
const updatedAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ invalid_type_error: 'Academic department must be string' })
            .optional(),
        academicFaculty: zod_1.z
            .string({ required_error: 'faculty is required' })
            .optional(),
    }),
});
exports.AcademicDepartmentValidations = {
    academicDepartmentValidationSchema,
    updatedAcademicDepartmentValidationSchema,
};
