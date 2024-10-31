export type Client = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePicture: string;
    gender: "male" | "female" | "none";
    dob: string; // or Date if using `z.date()`
    createdAt: string;
};

