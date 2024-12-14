import { z } from 'zod'

const emailSchema = z.string().email("Please use Valid Email")

export const mailSchema = z.object({
    to: z.array(emailSchema)
        .min(1, { message: "Minimum of 1 recipient required" }),
    text: z.string()
        .min(1, { message: "Message text is required" })
        .max(10000, { message: "Message text cannot exceed 10000 characters" }),
    subject: z.string()
        .min(1, { message: "Subject is required" })
        .max(200, { message: "Subject cannot exceed 200 characters" }),
    recipientName: z.string()
        .min(1, { message: "Recipient name is required" })
        .max(100, { message: "Recipient name cannot exceed 100 characters" })
})