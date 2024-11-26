import { Organization } from "./organization";
import { Service } from "./service";

export type Member = {
    id: number;
    languageProficiency: string[]; // Array of strings for languages like "english", "burmese"
    // serviceIds?: string[]; // Array of service IDs
    services: Service[]
    firstName: string; // String for first name
    lastName: string; // String for last name
    email: string; // String for email
    phone: string; // String for phone number
    dob: string; // Date in ISO string format for date of birth
    profilePictureUrl: string; // URL string for profile picture
    gender: 'male' | 'female'; // Gender as a string with specific options
    jobTitle: string; // String for job title
    notes: string; // String for notes or additional information
    startDate: string; // Date in ISO string format for start date
    experience: number; // Number for years of experience
    memberId: string; // String for member ID
    type: 'employee' | 'self-employed'; // String literal type for role (in this case, "employee")
    address?: string; // String for address
    country?: string; // String for country
    rating: number;
    ratingCount: number;
    commissionFeesType: 'percent' | 'fixed',
    commissionFees: number;
    role: 'member' | 'organization';
    createdAt: string;
    organization: Organization;
}
