import { Service } from "./service";

export type Category = {
    id: number;
    name: string;
    notes: string;
    services: Service[]
}