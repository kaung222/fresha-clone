import { z } from "zod";

export const UserRegisterSchema = z.object({
    email: z.string().email("Invalid email format"), // email must be a valid email
    firstName: z.string().min(1, "First name is required"), // firstName must be a non-empty string
    lastName: z.string().min(1, "Last name is required"), // lastName must be a non-empty string
    // address: z.string().min(1, "Address is required"), // address must be a non-empty string
    // types: z.array(z.string()).nonempty("At least one type is required"), // types must be a non-empty array of strings
    password: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length of 8 characters
        .max(100, "Password must be less than 100 characters") // Optional maximum length
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
        .regex(/\d/, "Password must contain at least one number") // At least one number
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)") // At least one special character
        .refine((value) => !/\s/.test(value), "Password must not contain spaces"), // No spaces allowed
    confirmPassword: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length of 8 characters
        .max(100, "Password must be less than 100 characters") // Optional maximum length
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
        .regex(/\d/, "Password must contain at least one number") // At least one number
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)") // At least one special character
        .refine((value) => !/\s/.test(value), "Password must not contain spaces")
        .optional() // No spaces allowed
})

export const EmailSchema = z.object({
    email: z.string().email("Invalid email format")
})