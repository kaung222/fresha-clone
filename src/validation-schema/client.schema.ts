import { z } from 'zod';

export const ClientSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    profilePicture: z.string().url(),
    gender: z.enum(['male', 'female', 'none']),
    dob: z.string().datetime(), // or use `z.date()` if you prefer it to be a Date object
});
