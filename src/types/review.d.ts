
import { User } from "./user";



export interface OrganizationReview {
    appointmentId: string;
    createdAt: string; // ISO date string
    id: string;
    notes: string;
    orgId: number;
    rating: number;
    updatedAt: string; // ISO date string
    user: User; // Nested user object
    userId: string; // Reference to the user
}
