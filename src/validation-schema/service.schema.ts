import { z } from "zod";

export const ServiceSchema = z.object({
    name: z.string().min(1, "Service Name is required"),
    type: z.string().min(1, "Type should not empty"),
    categoryId: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Age must be a positive number")),
    price: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Age must be a positive number")),
    duration: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Age must be a positive number")),
    notes: z.string(),
    priceType: z.string(),
    discountType: z.string(),
    discount: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Age must be a positive number")),
    targetGender: z.string(),
    // memberIds: z.array(z.string())
})
