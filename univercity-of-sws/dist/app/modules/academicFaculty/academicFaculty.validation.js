"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidations = void 0;
const zod_1 = require("zod");
const academicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic faculty bust be string' }),
    }),
});
const updatedAcademicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic faculty bust be string' }),
    }),
});
exports.AcademicFacultyValidations = {
    academicFacultyValidationSchema,
    updatedAcademicFacultyValidationSchema,
};
