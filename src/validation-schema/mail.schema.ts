import { z } from 'zod'


export const MailSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    recipientName: z.string().min(1, 'Recipient name is required'),
    text: z.string().min(1, 'Message is required'),
    mailTo: z.string().refine(
        (val) => ["clients", "members", "custom"].includes(val),
        {
            message: "mail to must be one of the following values: clients, members, custom",
        }
    ).default('custom'),
    to: z.array(z.string().email('Invalid email address')).optional(),
})