export type MemberSchedule = {
    id: number;
    startTime: number;
    endTime: number;
    dayOfWeek: string;
    memberId: number;
    breakTimes: any[]; // Or `unknown[]` if no structure is needed
};