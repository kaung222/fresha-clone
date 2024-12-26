export type Product = {
    images: string[],
    thumbnail: string,
    name: string;
    code?: string | null;
    price: number;
    brand?: string | null;
    description: string;
    category?: string | null;
    instock: boolean;
    stock: number;
    moq: number;
    id: string;
    createdAt: string;
    discountType: string;
    discountPrice: number;
    discount: number
};