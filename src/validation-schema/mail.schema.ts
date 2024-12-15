import { z } from 'zod'


export const MailSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    recipientName: z.string().min(1, 'Recipient name is required'),
    text: z.string().min(1, 'Message is required'),
    isToAllClient: z.boolean().default(false),
    to: z.array(z.string().email('Invalid email address')).min(1, 'At least one recipient is required'),
})