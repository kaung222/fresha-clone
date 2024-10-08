export type Clinic = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  website?: string;
  appointmentFees: number;
  description: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Assuming status can be one of these three states
  rating: number;
  totalReviews: number;
  profilePictureUrl: string;
  isPublished?: boolean;
};
