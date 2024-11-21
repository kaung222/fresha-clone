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
    id: string; // UUID
    amount: string; // Assuming it's a string, otherwise use `number`
    clientName: string;
    createdAt: string; // ISO 8601 formatted date
    updatedAt: string; // ISO 8601 formatted date
    member: Member;
    memberId: number;
    method: string; // e.g., "Cash", "Card", etc.
    products: Product[]; // Array of products
    services: Service[]; // Array of services
}
