import { z } from "zod";

export const ClosedPeriodSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    notes: z.string(),
    type: z.string(),
});