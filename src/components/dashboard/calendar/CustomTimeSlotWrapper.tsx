'use client'
import { Dispatch, useState } from 'react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NewAppointmentType } from './CalanderAppPage';
import { Calendar, CalendarOff } from 'lucide-react';

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

    const openNewApppointmentDrawer = (resource: number, value: Date) => {
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
                background: `${hour >= 6 && hour <= 18 ? '#fff' : 'rgba(211, 211, 211,0.5)'}`,
            }}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute w-full h-full outline-none border-none" onClick={() => console.log('ok')} style={{ zIndex: '1' }}>
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
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ zIndex: '100' }}>
                    <DropdownMenuLabel className="bg-gray-100">{format(value, 'HH:mm')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openNewApppointmentDrawer(resource, value)} className=' h-10 flex space-x-2 '><Calendar className=' size-5 ' /> Add Appointment</DropdownMenuItem>
                    <DropdownMenuItem className=' h-10 flex space-x-2 '><CalendarOff className=' size-5 ' /> Add BlockTime</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
