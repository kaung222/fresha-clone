export type ProductSale = {
    id: number;
    createdAt: string; // ISO 8601 format for dates
    updatedAt: string; // ISO 8601 format for dates
    deletedAt: string | null; // Can be null if not deleted
    notes: string | null; // Optional text field
    totalPrice: string; // Stored as a string, likely for precise decimal handling
    username: string; // Represents the user
};