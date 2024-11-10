import { z } from 'zod';

export const SingleMemberSchedule = z.object({
    startTime: z.number().min(0),
    endTime: z.number().min(0),
    dayOfWeek: z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]),
    memberId: z.number().nonnegative(),
});


export const SingleMemberScheduleUpdateSchema = z.object({
    id: z.number(),
    startTime: z.number().min(0),
    endTime: z.number().min(0),
    dayOfWeek: z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]),
    memberId: z.number().nonnegative(),
})


export const MultipleMemberScheduleUpdateSchema = z.object({
    schedules: SingleMemberScheduleUpdateSchema.array()
})
