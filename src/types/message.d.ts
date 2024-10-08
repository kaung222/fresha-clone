import { Clinic } from "./clinic";
import { User } from "./user";

export type Message = {
  _id: string;
  content: string;
  type: string;
  senderId: string;
  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
