import { Member } from "./member";

export type RegisterResponseType = {
    message: string;
    accessToken: string;
    member: Member
}