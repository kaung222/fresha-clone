import * as z from 'zod';

export const sendEmailToAdminSchema = z.object({
    from: z.string().email("Invalid email format").optional(),
    text: z.string().min(1, "Text field cannot be empty"),
    subject: z.string().min(1, "Subject field cannot be empty"),
});

