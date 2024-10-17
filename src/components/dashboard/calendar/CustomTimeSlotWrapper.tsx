'use client'
import { useState } from 'react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface CustomTimeSlotWrapperProps {
    value: Date;
    children: React.ReactNode;
}

export const CustomTimeSlotWrapper: React.FC<CustomTimeSlotWrapperProps> = ({ value, children }) => {
    const [tooltip, setTooltip] = useState<{ visible: boolean; time: string | null }>({
        visible: false,
        time: null,
    });

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
                zIndex: '30',
                position: 'relative',
                background: `${hour >= 6 && hour <= 18 ? '#fff' : 'rgba(211, 211, 211,0.5)'}`,
            }}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute w-full h-full outline-none border-none" onClick={() => console.log('ok')} style={{ zIndex: '40' }}>
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
                    <DropdownMenuItem>Add Appointment</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
