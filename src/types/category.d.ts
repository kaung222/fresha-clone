import { Service } from "./service";

export type Category = {
    id: number;
    name: string;
    notes: string;
    colorCode: string;
    services: Service[]
}