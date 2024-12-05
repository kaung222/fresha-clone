import { Appointment } from "./appointment";
import { Member } from "./member";
import { Product } from "./product";
import { Service } from "./service";

export type Payment = {
    amount: string; // Assuming it's always a string
    clientName: string;
    createdAt: string; // ISO date string
    id: string; // UUID format
    member: null | any; // Can be null or another type if specified
    memberId: null | string; // Can be null or a string
    method: string; // Payment method like "Cash"
    updatedAt: string; // ISO date string
}



export type PaymentDetail = {
    id: string; // Sale ID (e.g., UUID)
    appointmentId: number; // Related appointment ID
    clientName: string; // Client's name
    method: string; // Payment method (e.g., "Cash")
    sale: string | null; // Sale information
    saleId: string | null; // Sale ID
    notes: string; // Additional notes for the sale
    orgId: number; // Organization ID
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    amount: number;
    appointment: Appointment
}
