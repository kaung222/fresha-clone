import { Appointment } from "./appointment";
import { Member } from "./member";
import { Product } from "./product";
import { ProductSale } from "./productsale";
import { Service } from "./service";

export type Payment = {
    id: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    amount: number;
    appointmentId: string | null;
    clientName: string; // Can be "unknown"
    method: string; // e.g., "Cash"
    notes: string | null;
    orgId: number;
    saleId: string | null;
}



export type PaymentDetail = {
    id: string; // Sale ID (e.g., UUID)
    appointmentId: string | null; // Related appointment ID
    clientName: string; // Client's name
    method: string; // Payment method (e.g., "Cash")
    sale: ProductSale | null; // Sale information
    saleId: string | null; // Sale ID
    notes: string; // Additional notes for the sale
    orgId: number; // Organization ID
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    amount: number;
    appointment: Appointment | null
}
