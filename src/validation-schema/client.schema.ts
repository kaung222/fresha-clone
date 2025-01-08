import { z } from 'zod';

export const ClientSchema = z.object({
    firstName: z
        .string({ required_error: "firstName must be a string" })
        .nonempty("firstName should not be empty"),
    lastName: z.string().optional(),
    email: z.string({ required_error: "email must be an email" })
        .email("email must be an email")
        .nonempty("email should not be empty"),
    phone: z.string().regex(
        /^[+]?[0-9]{10,15}$/,
        "Invalid phone number format. It should be 10 to 15 digits and may start with '+'"
    ),
    profilePicture: z.string().url().optional(),
    gender: z.string().refine(
        (val) => ["male", "female", "none"].includes(val),
        {
            message: "gender must be one of the following values: male, female, none",
        }
    ),

    dob: z.string().optional(), // or use `z.date()` if you prefer it to be a Date object
});
