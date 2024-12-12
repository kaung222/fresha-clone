import { z } from "zod";

export const ServiceSchema = z.object({
    thumbnailUrl: z.string().optional(),
    name: z.string().min(1, "Service Name is required"),
    categoryId: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Select category of service")),
    price: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Price must be non-negative number")),
    duration: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Duration must be a positive number")),
    description: z.string(),
    priceType: z.string(),
    discountType: z.string(),
    discount: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Discount must be non-negative number")),
    targetGender: z.string(),
})
    .refine(
        (data) =>
            (data.discountType === "percent" && data.discount <= 100) ||
            (data.discountType === "fixed" && data.discount <= data.price),
        {
            message: "Invalid discount: must be ≤ 100 for percent or ≤ price for fixed",
            path: ["discount"], // Point to the "discount" field in case of error
        }
    )
    .refine(
        (data) =>
            (data.priceType === "free" && data.price === 0) || // Price must be 0 if priceType is free
            (data.priceType !== "free" && data.price > 0), // Price must be positive otherwise
        {
            message: "Invalid price: must be 0 for free or positive for other price types",
            path: ["price"], // Point to the "price" field in case of error
        }
    )
