import { Clinic } from "./clinic";
import { Message } from "./message";
import { User } from "./user";

export type Conversation = {
  _id: string;
  user: User;
  clinicId: string;
  message: Message[];
  latestMessage?: Message;
};
