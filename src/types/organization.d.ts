export type Organization = {
    id: number;
    thumbnail: string | null;
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
    slug: string;
    notes: string;
    totalReviews: number;
    isPublished: boolean;
    currency: string;
};
