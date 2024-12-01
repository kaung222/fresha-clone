import { Client } from "./client";
import { Member } from "./member";
import { Service } from "./service";

type BookingItem = {
    id: string; // UUID for the booking item
    serviceName: string; // Name of the service
    memberName: string; // Name of the member
    serviceId: number; // ID of the service
    memberId: number; // ID of the member
    appointmentId: number; // ID of the associated appointment
    startTime: number; // Start time in seconds since midnight
    endTime: number; // End time in seconds since midnight
    price: number; // Price of the service
    duration: number; // Duration in seconds
    discountPrice: number; // Discounted price
    commissionFees: number; // Commission fees
};
type DetailBookingItem = {
    id: string; // UUID for the booking item
    serviceName: string; // Name of the service
    memberName: string; // Name of the member
    serviceId: number; // ID of the service
    memberId: number; // ID of the member
    appointmentId: number; // ID of the associated appointment
    startTime: number; // Start time in seconds since midnight
    endTime: number; // End time in seconds since midnight
    price: number; // Price of the service
    duration: number; // Duration in seconds
    discountPrice: number; // Discounted price
    commissionFees: number; // Commission fees
    service: Service;
    member: Member;
};

export type Appointment = {
    id: number; // Appointment ID
    createdAt: string; // ISO date string for when the record was created
    updatedAt: string; // ISO date string for when the record was last updated
    deletedAt: string | null; // ISO date string or null for deleted records
    date: string; // Appointment date in ISO string format
    username: string; // Username of the customer
    notes: string | null; // Notes for the appointment
    status: "pending" | "confirmed" | "cancelled" | "completed"; // Status of the appointment
    phone: string; // Phone number of the customer
    email: string; // Email of the customer
    profilePicture: string; // URL of the customer's profile picture
    gender: "male" | "female" | "none"; // Gender of the customer
    totalTime: number; // Total duration in seconds
    totalPrice: number; // Total price for the appointment
    discountPrice: number; // Discounted total price
    isOnlineBooking: boolean; // Whether the booking is online
    startTime: number; // Start time in seconds since midnight
    endTime: number; // End time in seconds since midnight
    orgId: number; // Organization ID
    bookingItems: DetailBookingItem[]; // Array of booking items
};
export type AppointmentForAll = {
    id: number; // Appointment ID
    createdAt: string; // ISO date string for when the record was created
    updatedAt: string; // ISO date string for when the record was last updated
    deletedAt: string | null; // ISO date string or null for deleted records
    date: string; // Appointment date in ISO string format
    username: string; // Username of the customer
    notes: string | null; // Notes for the appointment
    status: "pending" | "confirmed" | "cancelled" | "completed"; // Status of the appointment
    phone: string; // Phone number of the customer
    email: string; // Email of the customer
    profilePicture: string; // URL of the customer's profile picture
    gender: "male" | "female" | "none"; // Gender of the customer
    totalTime: number; // Total duration in seconds
    totalPrice: number; // Total price for the appointment
    discountPrice: number; // Discounted total price
    isOnlineBooking: boolean; // Whether the booking is online
    startTime: number; // Start time in seconds since midnight
    endTime: number; // End time in seconds since midnight
    orgId: number; // Organization ID
    bookingItems: BookingItem[]; // Array of booking items
};


export type AppointmentService = {
    id: number;
    name: string;
    description: string;
    price: string;
    thumbnailUrl: string;
    targetGender: 'all' | 'male' | 'female';
    duration: number;
    priceType: string;
    members: Member[];
    providedMember: Member;
    discount: number;
    discountType: string;
    discountPrice: number;
    type: 'Single Service' | 'Package';
    orgId: number;
    serviceCount: number;
    serviceNames: string[] | null;
    category: {
        id: number,
        name: string;
        notes: string;
    }
}


// export type AppointmentEvent = {
//     id: number;
//     createdAt: string; // ISO date string
//     updatedAt: string; // ISO date string
//     deletedAt: string | null; // ISO date string or null
//     date: string; // Timestamp as a string
//     username: string;
//     email: string;
//     notes: string;
//     status: 'pending' | 'confirmed' | 'cancelled' | 'completed'; // Adjust status options as needed
//     phone: string;
//     gender: 'male' | 'female' | 'none'; // Adjust options as needed
//     totalTime: number; // in minutes
//     totalPrice: number; // in currency units
//     start: Date; // Timestamp as a string
//     end: Date; // Timestamp as a string
//     memberId: number;
//     // member: Member;
//     user: null;
//     // client: Client;

// };


export type AppointmentEvent = {
    id: string; // UUID for the booking item
    serviceName: string; // Name of the service
    memberName: string; // Name of the member
    serviceId: number; // ID of the service
    memberId: number; // ID of the member
    appointmentId: number; // ID of the associated appointment
    startTime: number; // Start time in seconds since midnight
    endTime: number; // End time in seconds since midnight
    price: number; // Price of the service
    duration: number; // Duration in seconds
    discountPrice: number; // Discounted price
    commissionFees: number; // Commission fees
    // more 
    date: string;
    start: Date;
    end: Date;
    main: AppointmentForAll
}
