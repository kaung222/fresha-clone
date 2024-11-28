import { z } from 'zod';


export const MemberSchema = z.object({
    firstName: z.string().min(1, "First name is required"), // Required and must not be empty
    lastName: z.string().optional(), // Optional: Can be string or undefined
    email: z.string().email("Invalid email address"), // Required and must be a valid email
    phone: z.string().min(1, "Phone number is required"), // Required
    gender: z.string().optional(), // Optional
    dob: z.string().optional(), // Optional; can be a Date object or undefined
    country: z.string().optional(), // Optional
    jobTitle: z.string().optional(), // Optional
    type: z.string(), // Optional
    commissionFeesType: z.string(),
    commissionFees: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Commission fees must be non-negative number")),
    experience: z.preprocess((val) => {
        // Convert input to a number if it's a string
        if (typeof val === 'string') return parseFloat(val);
        return val;
    }, z.number().min(0, "Experience must be non-negative number")).optional(),
    languageProficiency: z.array(z.string()).optional(), // Optional; array of strings
    memberId: z.string().optional(), // Optional; must be a string if provided
    profilePictureUrl: z.string().url("Invalid URL").optional(), // Optional; must be a valid URL if provided
    startDate: z.string().optional(), // Optional
    notes: z.string().optional(), // Optional
}).refine(
    (data) =>
        (data.commissionFeesType === "percent" ? data.commissionFees <= 100 : true),
    {
        message: "Invalid commission Fees: must be ≤ 100 for percent",
        path: ["commissionFees"], // Point to the "discount" field in case of error
    }
);

