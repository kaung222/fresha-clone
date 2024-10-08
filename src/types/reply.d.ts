import { User } from "./user";

export type Reply = {
    id: string;
    content: string;
    createdAt: string;
    type: string;
    updateAt: string;
    user: User
}