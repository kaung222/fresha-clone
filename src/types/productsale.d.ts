import { Product } from "./product";

type SaleItem = {
    id: string; // UUID format
    images: string[] | null; // Nullable array of strings
    name: string; // Name of the item
    price: number; // Price per item
    quantity: number; // Quantity of the item
    subtotalPrice: number; // Calculated subtotal price for the item
};


export type ProductSale = {
    createdAt: string; // ISO date string
    email: string | null;
    id: string; // UUID format
    notes: string;
    orgId: number;
    phone: string | null;
    saleItems: SaleItem[];
    totalPrice: number;
    updatedAt: string; // ISO date string
    username: string;
};



type DetailSaleItem = {
    id: string; // UUID format
    name: string; // Item name
    price: number; // Price per unit
    images: string[] | null; // Nullable array of image URLs
    quantity: number; // Quantity of the item
    subtotalPrice: number; // Subtotal price (price * quantity)
    product: Product; // Product details
};

export type ProductSaleDetail = {
    id: string; // UUID format
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    username: string; // Customer username
    email: string | null; // Nullable email address
    phone: string | null; // Nullable phone number
    totalPrice: number; // Total price of the sale
    notes: string; // Additional notes
    orgId: number; // Organization ID
    saleItems: DetailSaleItem[]; // List of sale items
};