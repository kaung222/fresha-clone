import { z } from "zod";

export const CreateTimeTableSchema = z.object({
    day: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    status: z.string(),
    maxBookings: z.number(),
    notes: z.string(),
    doctorId: z.string(),
})