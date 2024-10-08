import { Clinic } from "./clinic";
import { User } from "./user";

export type Comment = {
    id: string;
    createdAt: string;
    updateAt: string;
    content: string;
    userId: string;
    type: string;
    user?: User;
    clinic?: Clinic
    likeCount: number;
    replyCount: number;
}
