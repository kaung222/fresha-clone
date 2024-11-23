import { Service } from "./service";

export type Category = {
    id: number;
    name: string;
    notes: string;
    colorCode: string;
    services: Service[]
}
export type ProductBrand = {
    id: number;
    name: string;
    notes: string;

}
export type ProductCategory = {
    id: number;
    name: string;
    notes: string;

}