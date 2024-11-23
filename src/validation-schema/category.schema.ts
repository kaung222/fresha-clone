import { z } from "zod";


export const CategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    notes: z.string(),
    colorCode: z.string(),
})
export const ProductCategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    notes: z.string(),
})
export const ProductBrandSchema = z.object({
    name: z.string().min(1, "Category name is required"),
    notes: z.string(),
})