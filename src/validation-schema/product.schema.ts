import { z } from 'zod';

export const ProductSchema = z.object({
    images: z.array(z.string()),
    name: z.string(),
    code: z.string().nullable().optional(),
    price: z.number().min(0),
    brand: z.string().nullable().optional(),
    description: z.string(),
    category: z.string().nullable().optional(),
    instock: z.string(),
    moq: z.number().int().default(1),
});

