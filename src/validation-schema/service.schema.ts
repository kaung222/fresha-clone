import { z } from "zod";

export const ServiceSchema = z.object({
    name: z.string().min(1, "Service Name is required"),
    type: z.string(),
    categoryId: z.number(),
    price: z.number(),
    duration: z.number(),
    notes: z.string(),
    priceType: z.string(),
    targetGender: z.string(),
    memberIds: z.array(z.string())
})