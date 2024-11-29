import { z } from 'zod';

export const AppointmentSchema = z.object({
    // clientId: z.number().int().min(0),
    date: z.string(),
    startTime: z.number(),
    username: z.string(),
    notes: z.string(),
    status: z.string(), // Update enum values as necessary
    phone: z.string(),
    gender: z.enum(['male', 'female', 'none']), // Update as needed
    email: z.string().email(),
    memberId: z.number().int().min(0),
    serviceIds: z.array(z.number().int().min(0)),
});


export const UpdateAppointmentSchema = z.object({
    // clientId: z.number().optional(),
    serviceIds: z.array(z.number()).min(1).optional(), // Ensures at least one service ID
    date: z.string().optional(),
    username: z.string().optional(),
    notes: z.string().optional(),
    status: z.string().optional(), // You can add more valid statuses here
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'none']).optional(), // Adjust options based on requirements
    email: z.string().email().optional(),
    memberId: z.number().optional(),
    startTime: z.number().optional(),
});