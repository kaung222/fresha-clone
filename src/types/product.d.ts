export type Product = {
    images: string[],
    name: string;
    code?: string | null;
    price: number;
    brand?: string | null;
    description: string;
    category?: string | null;
    instock: boolean;
    stock: number;
    moq: number;
    id: number;
    createdAt: string;
    discountType: string;
    discount: number
};