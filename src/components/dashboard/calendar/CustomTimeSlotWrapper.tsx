'use client'
import { Dispatch, useState } from 'react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NewAppointmentType } from './CalanderAppPage';
import { AlertCircle, Calendar, CalendarOff } from 'lucide-react';
import { FormattedType, GetFormatClosedPeriods } from '@/api/closed-period/get-format-closed-period';
import { GetOrgSchedule } from '@/api/org-schedule/get-org-schedule';
import { OrgSchedule } from '@/types/org-schedule';

interface CustomTimeSlotWrapperProps {
    value: Date;
    children: React.ReactNode;
    event: any;
    resource: any;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>
}

export const CustomTimeSlotWrapper: React.FC<CustomTimeSlotWrapperProps> = ({ value, children, event, resource, setMakeNewAppointment }) => {
    const [tooltip, setTooltip] = useState<{ visible: boolean; time: string | null }>({
        visible: false,
        time: null,
    });
    const [open, setOpen] = useState(false);
    const { data: closeDays } = GetFormatClosedPeriods();
    const { data: schedules } = GetOrgSchedule()


    // const parseScheduleData = (schedule: OrgSchedule[]) => {
    //     return schedule.map((s) => ({
    //       ...s,
    //       startHour: s.startTime / 3600, // Convert seconds to hours
    //       endHour: s.endTime / 3600,
    //     }));
    //   };

    const isAvailableSlot = (value: Date, schedules: OrgSchedule[] | undefined, closeDays: FormattedType[] | undefined) => {
        const today = format(value, "yyyy-MM-dd");
        const dayOfWeek = format(value, "EEEE"); // e.g., Monday
        const hour = value.getHours();

        // Check if it's a closed day
        const isClosed = closeDays?.some((d) => d.date === today);
        if (isClosed) return false;

        // Find today's schedule
        const scheduleForToday = schedules?.find((s) => s.dayOfWeek === dayOfWeek);
        if (!scheduleForToday) return false;

        // Check if the slot is within open hours
        return hour >= scheduleForToday.startTime / 3600 && hour < scheduleForToday.endTime / 3600;
    };

    const isSlotAvailable = isAvailableSlot(value, schedules, closeDays);


    const openNewApppointmentDrawer = (resource: string, value: Date) => {
        console.log(resource, value, event)
        setMakeNewAppointment({ resource, value })
    }

    const hour = value.getHours();

    const handleMouseEnter = (slotStart: Date) => {
        const formattedTime = format(slotStart, 'HH:mm');
        setTooltip({ visible: true, time: formattedTime });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, time: null });
    };

    return (
        <div className="rbc-time-slot"
            style={{
                height: '100%',
                width: '100%',

                position: 'relative',
                background: `${isSlotAvailable ? '#fff' : 'rgba(211, 211, 211,0.5)'}`,
            }}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {resource && (
                <DropdownMenu open={open} onOpenChange={setOpen} >
                    <button style={{ zIndex: '1' }} onClick={() => setOpen(true)} className=' absolute w-full h-full text-center outline-none border-none '>
                        {tooltip.visible && (
                            <div style={{
                                position: 'absolute',
                                top: '0px',
                                width: '100%',
                                height: '100%',
                                color: 'black',
                                fontSize: '12px',
                            }}>
                                {tooltip.time}
                            </div>
                        )}
                    </button>
                    <DropdownMenuTrigger className="absolute w-full outline-none border-none" onClick={() => console.log('ok')} style={{ zIndex: '1' }}>
                        {/* {tooltip.visible && (
                        <div style={{
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '100%',
                            color: 'black',
                            fontSize: '12px',
                        }}>
                            {tooltip.time}
                        </div>
                    )} */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ zIndex: '100' }}>
                        <DropdownMenuLabel className="bg-gray-100">{format(value, 'HH:mm')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled={resource == -1 || !resource} onClick={() => openNewApppointmentDrawer(resource, value)} className=' h-10 flex space-x-2 '><Calendar className=' size-5 ' /> Add Appointment</DropdownMenuItem>
                        {/* <DropdownMenuItem disabled={resource == -1 || !resource} className=' h-10 flex space-x-2 '><CalendarOff className=' size-5 ' /> Add BlockTime</DropdownMenuItem> */}
                        {!isSlotAvailable && (
                            <div className="mt-2 flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Not work time!
                            </div>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
