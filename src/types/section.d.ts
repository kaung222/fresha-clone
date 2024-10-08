import { Timetable } from "./timetable";

export type Section = {
    id: string;
    status: string;
    timetable: Timetable;
}