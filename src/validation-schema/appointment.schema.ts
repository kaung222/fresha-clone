import { z } from 'zod';

const BookingItemSchema = z.object({
    serviceId: z.string().min(1, "Service ID must be included"), // Service ID
    memberId: z.string().min(1, "Member Id must be included "), // Member ID (nullable if not assigned)
});


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
    // memberId: z.number().int().min(0),
    // serviceIds: z.array(z.number().int().min(0)),
    bookingItems: z
        .array(BookingItemSchema)
        .min(1, "At least one booking item is required"), // Booking items list
});


export const UpdateAppointmentSchema = z.object({
    // clientId: z.number().optional(),
    // serviceIds: z.array(z.number()).min(1).optional(), // Ensures at least one service ID
    date: z.string().optional(),
    username: z.string().optional(),
    notes: z.string().optional(),
    status: z.string().optional(), // You can add more valid statuses here
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'none']).optional(), // Adjust options based on requirements
    email: z.string().email().optional(),
    memberId: z.number().optional(),
    startTime: z.number().optional(),
    bookingItems: z
        .array(BookingItemSchema)
        .min(1, "At least one booking item is required"), // Booking items list
});

export const CancelAppointmentSchema = z
    .object({
        reason: z.string().optional(),
        reasons: z.string().optional(),
    })
    .refine(
        (data) => data.reason?.trim() || data.reasons?.trim(),
        {
            message: "Either reason or reasons is required!",
            path: ["reason"], // You can choose which field to point to in the error
        }
    );