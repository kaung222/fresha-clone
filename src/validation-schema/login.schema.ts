import { z } from "zod";


export const LoginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length of 8 characters
        .max(100, "Password must be less than 100 characters") // Optional maximum length
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
        .regex(/\d/, "Password must contain at least one number") // At least one number
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)") // At least one special character
        .refine((value) => !/\s/.test(value), "Password must not contain spaces"),
})