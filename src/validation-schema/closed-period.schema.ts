import { z } from "zod";

const currentDate = new Date();

export const ClosedPeriodFormSchema = z.object({
    startDate: z.date().refine(
        (date) => date > currentDate,
        { message: "startDate must be greater than the current date" }
    ),
    endDate: z.date().refine(
        (date) => date > currentDate,
        { message: "endDate must be greater than the current date" }
    ),
    notes: z.string().optional(),
    type: z.string().optional(),
});

export const ClosedPeriodSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    notes: z.string().optional(),
    type: z.string().optional(),
});