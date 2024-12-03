type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Appointment {
    status: AppointmentStatus;
}

interface BookingItem {
    id: string;
    serviceName: string;
    date: string; // Format: "YYYY-MM-DD"
    memberName: string;
    serviceId: number;
    memberId: number;
    appointmentId: number;
    startTime: number; // In seconds from midnight
    endTime: number;   // In seconds from midnight
    price: number;
    duration: number;  // In seconds
    discountPrice: number;
    commissionFees: number;
    appointment: Appointment;
}

interface BookingData {
    totalDuration: string;        // Total duration in seconds as a string
    totalCommissionFees: string; // Total commission fees as a string
    totalDiscountPrice: string;  // Total discount price as a string
    totalServiceCount: string;   // Total service count as a string
}

export interface MemberStatistics {
    BookingItems: BookingItem[];
    data: BookingData;
}

export type OverallStatistics = {
    date: String,
    totalCommissionFees: string,
    totalDiscountPrice: string,
    totalAppointments: string
}
