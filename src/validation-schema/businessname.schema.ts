import z from "zod";

export const BusinessNameSchema = z.object({
    name: z.string().min(1, "Business name is required"),
    address: z.string().min(2, "Address is Required")
})
