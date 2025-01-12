export type User = {
    id: string; // UUID format
    createdAt: string; // ISO date string
    dob: string | null; // Date of birth, can be null
    email: string; // User's email address
    firstName: string; // User's first name
    gender: "male" | "female" | "none"; // Gender, limited to specific options
    lastName: string; // User's last name
    phone: string | null; // User's phone number, can be null
    profilePicture: string; // URL to the profile picture
    updatedAt: string; // ISO date string
};