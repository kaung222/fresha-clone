import { z } from 'zod';

// Assuming DayOfWeek is an enum, define it here for use in the Zod schema
const DayOfWeekEnum = z.enum(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]); // Modify this with actual values in DayOfWeek

// Schema for Schedule
const ScheduleSchema = z.object({
    startTime: z.number().positive().int(), // Requires startTime to be a positive integer
    endTime: z.number().positive().int(),   // Requires endTime to be a positive integer
    dayOfWeek: DayOfWeekEnum,               // Enum for dayOfWeek
});

// Schema for UpdateMultiScheduleDto
export const PublicationOpeningHourSchema = z.object({
    schedules: z.array(ScheduleSchema), // Array of Schedule objects, must not be empty
});

