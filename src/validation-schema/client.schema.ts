import { z } from 'zod';

export const ClientSchema = z.object({
    firstName: z
        .string({ required_error: "firstName must be a string" })
        .nonempty("firstName should not be empty"),
    lastName: z.string().optional(),
    email: z.string({ required_error: "email must be an email" })
        .email("email must be an email")
        .nonempty("email should not be empty"),
    phone: z
        .string({ required_error: "phone must be a valid phone number" })
        .nonempty("phone should not be empty")
        .regex(/^\+?[1-9]\d{1,14}$/, "phone must be a valid phone number"), // Example: E.164 format
    profilePicture: z.string().url().optional(),
    gender: z.string().refine(
        (val) => ["male", "female", "none"].includes(val),
        {
            message: "gender must be one of the following values: male, female, none",
        }
    ),

    dob: z.string().optional(), // or use `z.date()` if you prefer it to be a Date object
});
