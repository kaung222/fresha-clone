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

type SaleItem = {
    id: string; // UUID
    images: string[] | null; // Array of image URLs or null if no images
    name: string; // Product name
    price: number; // Price per unit
    productId: string; // UUID for the product
    quantity: number; // Quantity of the product
    sale: {
        createdAt: string;
    }; // Sale details
    subtotalPrice: number; // Total price for the product (price * quantity)
};

interface BookingData {
    totalDuration: string;        // Total duration in seconds as a string
    totalCommissionFees: string; // Total commission fees as a string
    totalDiscountPrice: string;  // Total discount price as a string
    totalServiceCount: string;   // Total service count as a string
}
interface saleData {
    totalQuantity: number;        // Total duration in seconds as a string
    totalPrice: number; // Total commission fees as a string

}

export interface MemberStatistics {
    bookingItems: BookingItem[];
    data: BookingData;
}
export interface ProductStatistics {
    saleItems: SaleItem[];
    data: saleData;
}

export type OverallStatistics = {
    date: String,
    totalCommissionFees: string,
    totalDiscountPrice: string,
    totalAppointments: string
}
