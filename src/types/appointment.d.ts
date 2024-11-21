import { Client } from "./client";
import { Member } from "./member";
import { Service } from "./service";

export type Appointment = {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    deletedAt: string | null; // ISO date string or null
    date: string; // Timestamp as a string
    username: string;
    notes: string;
    status: 'pending' | 'confirmed' | 'cancelled'; // Adjust status options as needed
    phone: string;
    gender: 'male' | 'female' | 'none'; // Adjust options as needed
    totalTime: number; // in minutes
    totalPrice: number; // in currency units
    startTime: number; // Timestamp as a string
    endTime: number; // Timestamp as a string
    memberId: number;
    user: null;
    client: Client;
    services: Service[]
};
export type AppointmentForAll = {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    deletedAt: string | null; // ISO date string or null
    date: string; // Timestamp as a string
    username: string;
    notes: string;
    status: 'pending' | 'confirmed' | 'cancelled'; // Adjust status options as needed
    phone: string;
    gender: 'male' | 'female' | 'none'; // Adjust options as needed
    totalTime: number; // in minutes
    totalPrice: number; // in currency units
    startTime: number; // Timestamp as a string
    endTime: number; // Timestamp as a string
    memberId: number;
    user: null;
    // client: Client;
    services: Service[]
};

export type AppointmentEvent = {
    id: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    deletedAt: string | null; // ISO date string or null
    date: string; // Timestamp as a string
    username: string;
    notes: string;
    status: 'pending' | 'confirmed' | 'cancelled'; // Adjust status options as needed
    phone: string;
    gender: 'male' | 'female' | 'none'; // Adjust options as needed
    totalTime: number; // in minutes
    totalPrice: number; // in currency units
    start: Date; // Timestamp as a string
    end: Date; // Timestamp as a string
    memberId: number;
    // member: Member;
    user: null;
    // client: Client;

};
