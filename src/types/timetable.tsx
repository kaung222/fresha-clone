export type Timetable = {
  day: number;
  notes: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  status: "available" | "leave" | "holiday" | "booked"; // You can adjust the union based on possible status values.
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
