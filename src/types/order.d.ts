import { User } from "./user";

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  orderItems: OrderItem[];

  user: User;

  orderId: string;

  id: string;

  createdAt: Date;

  updatedAt: Date;

  clinic?: Clinic;

  description: string;

  total: number;

  status: OrderStatus;
};
