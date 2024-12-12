import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(1, "product Name required"),
    code: z.string().nullable().optional(),
    price: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Price must be Positive number")),
    brand: z.string().nullable().optional(),
    description: z.string().optional(),
    category: z.string().nullable().optional(),
    stock: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Stock must be non negative number")),
    moq: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Price must be positive number")),
    discountType: z.string(),
    discount: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Discount must be non-negative number")),
});

