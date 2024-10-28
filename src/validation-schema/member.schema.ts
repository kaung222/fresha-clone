import { z } from 'zod';

export const MemberSchema = z.object({
    languageProficiency: z.array(z.string()), // Array of languages as strings
    serviceIds: z.array(z.string()),          // Array of service IDs as strings
    firstName: z.string(),                    // First name as a string
    lastName: z.string(),                     // Last name as a string
    email: z.string().email(),                // Email in a valid email format
    phone: z.string(),                        // Phone number as a string
    dob: z.string().datetime(),               // Date of birth as ISO date string
    profilePictureUrl: z.string().url(),       // Profile picture URL as a valid URL
    gender: z.enum(['male', 'female']),        // Gender restricted to 'male' or 'female'
    jobTitle: z.string(),                     // Job title as a string
    notes: z.string().optional(),             // Notes as an optional string
    startDate: z.string().datetime(),         // Start date as ISO date string
    experience: z.number().nonnegative(),     // Experience as a non-negative number
    memberId: z.string(),                     // Member ID as a string
    type: z.enum(['employee', 'self-employed']), // Type restricted to 'employee' or 'contractor'
    address: z.string(),                      // Address as a string
    country: z.string()                       // Country as a string
});