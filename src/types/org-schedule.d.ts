export type OrgSchedule = {
    id: number;
    startTime: number;
    endTime: number;
    dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
};
