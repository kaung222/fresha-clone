import { z } from "zod";


export const CategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    notes: z.string(),
    colorCode: z.string(),
})