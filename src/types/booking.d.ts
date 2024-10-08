import { User } from "./user";

export type Booking = {
  id: string;
  bookingId: string;
  bookingDate: Date;
  description?: string;
  status: string; // Pending, Confirmed, Cancelled, Completed
  user?: User;
  name: string;
  gender: string;
  phone: string;
  age: string;
  createdAt: Date;
};
