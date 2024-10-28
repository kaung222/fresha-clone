import { Member } from "./member";


export type Service = {
    id: number;
    name: string;
    description: string;
    price: string;
    thumbnailUrl: string;
    targetGender: 'all' | 'male' | 'female',
    duration: number;
    priceType: string;
    categoryId: number;
    members: Member[];
    category: {
        id: number,
        name: string;
        notes: string;
    }
}
