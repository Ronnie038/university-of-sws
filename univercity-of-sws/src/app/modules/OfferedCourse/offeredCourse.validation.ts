import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    return regex.test(time);
  },
  {
    message: 'Invalid time format ,  expected "HH:MM" in 24  hours format',
  },
);
// Replace with your actual enum values

const offeredCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string().refine(value => isValidObjectId(value)),
      academicFaculty: z.string().refine(value => isValidObjectId(value)),
      academicDepartment: z.string().refine(value => isValidObjectId(value)),
      course: z.string().refine(value => isValidObjectId(value)),
      faculty: z.string().refine(value => isValidObjectId(value)),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      section: z.number(),
      startTime: timeStringSchema, // HM: MM 00-23 :00-59
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        //   startTime : 10:30 => 1970-01-01T10:30
        //   endTime : 10:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string().refine(value => isValidObjectId(value)),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      body => {
        //   startTime : 10:30 => 1970-01-01T10:30
        //   endTime : 10:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time',
      },
    ),
});

export const offeredCourseValidations = {
  offeredCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
