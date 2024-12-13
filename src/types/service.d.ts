import { Member } from "./member";


export type Service = {
    thumbnailUrl: string | null;
    id: string;
    name: string;
    description: string;
    price: string;
    thumbnailUrl: string;
    targetGender: 'all' | 'male' | 'female';
    duration: number;
    priceType: string;
    members: Member[];
    discount: number;
    discountType: string;
    discountPrice: number;
    type: 'Single Service' | 'Package';
    orgId: number;
    serviceCount: number;
    serviceNames: string[] | null;
    category: {
        id: number,
        name: string;
        notes: string;
    }
}
