export type Organization = {
    id: number;
    createdAt: string; // ISO string format for dates
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    address: string;
    phones: string[] | null;
    images: string[] | null;
    types: string[];
    rating: number;
    latitude: string;
    longitude: string;
    notes: string;
    totalReviews: number;
    isPublished: boolean;
    currency: string;
};
