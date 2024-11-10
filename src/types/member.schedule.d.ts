export type Schedule = {
    id: number;
    startTime: number;
    endTime: number;
    dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    type: string;
    isRegular: boolean;
    notes: string;
    memberId: number;
};