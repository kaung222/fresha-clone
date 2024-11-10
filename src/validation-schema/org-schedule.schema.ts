import { z } from "zod";

// Define the schema for a single day schedule
export const DayScheduleSchema = z.object({
    id: z.number(),
    startTime: z.number(),
    endTime: z.number(),
    dayOfWeek: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
});

// Define the schema for the weekly schedule
export const OrgScheduleSchema = z.object({
    monday: DayScheduleSchema.nullable(),
    tuesday: DayScheduleSchema.nullable(),
    wednesday: DayScheduleSchema.nullable(),
    thursday: DayScheduleSchema.nullable(),
    friday: DayScheduleSchema.nullable(),
    saturday: DayScheduleSchema.nullable(),
    sunday: DayScheduleSchema.nullable(),
});

export const MultipleScheduleSchema = z.object({
    schedules: DayScheduleSchema.array()
})
