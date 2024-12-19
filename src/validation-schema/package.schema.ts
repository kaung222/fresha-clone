import { z } from "zod";




export const PackageSchema = z.object({
    thumbnailUrl: z.string().optional(),
    categoryId: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(1, "Select category of service")),
    description: z.string().optional(),
    discount: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Discount must be non-negative number")),
    discountType: z.string(),
    name: z.string().min(1, "Service Name is required"),
    targetGender: z.string(),
})
    .refine(
        (data) =>
            (data.discountType === "percent" && data.discount <= 100),
        {
            message: "Invalid discount: must be ≤ 100 for percent",
            path: ["discount"], // Point to the "discount" field in case of error
        }
    );

