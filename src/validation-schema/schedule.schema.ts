import { z } from "zod";

export const ScheduleSchema = z.object({
    startTime: z.number(), // in seconds or milliseconds as per your requirement
    endTime: z.number(),
    dayOfWeek: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    isRegular: z.boolean(),
    type: z.string(), // add more options as needed
    notes: z.string(),
    memberId: z.number(),
});