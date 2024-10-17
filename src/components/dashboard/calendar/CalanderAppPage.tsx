'use client';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomTimeSlotWrapper } from './CustomTimeSlotWrapper';
import { CustomToolbar } from './CustomToolbar';
import Link from 'next/link';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { Button } from '@/components/ui/button';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// events.ts
export const myEvents = [
    {
        id: '1',
        start: new Date(2024, 9, 9, 9),
        end: new Date(2024, 9, 9, 13),
        title: 'Event 1',
    },
    {
        id: '2',
        start: new Date(2024, 9, 10, 14),
        end: new Date(2024, 9, 10, 19),
        title: 'Event 2',
    },
];


const CalendarAppPage = () => {
    const [events, setEvents] = useState(myEvents);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>('week');
    const { setQuery } = useSetUrlParams()

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    return (
        <div className="app-container-hh h-h-screen-minus-70 flex flex-col overflow-hidden px-5 ">
            <Button onClick={() => setQuery({ key: 'drawer', value: 'new-appointment' })}>React Big Calendar POC</Button>
            <Calendar
                className=' overflow-auto'
                localizer={localizer}
                events={events}
                style={{ height: '100%' }}
                views={['week', 'day']}
                view={currentView}
                date={currentDate}
                timeslots={2}
                step={15}
                toolbar={true}
                formats={{
                    dayFormat: (date) => format(date, 'd EEEE'),
                }}
                onNavigate={handleNavigate}
                onView={handleViewChange}
                onSelectEvent={(event) => console.log(event)}
                components={{
                    toolbar: ({ label, onNavigate, onView, view }) => <CustomToolbar view={view} label={label} onNavigate={onNavigate} onView={onView} currentDate={currentDate} currentView={currentView} setCurrentDate={setCurrentDate} />,
                    timeSlotWrapper: (props: any) => <CustomTimeSlotWrapper value={props.value}>{props.children}</CustomTimeSlotWrapper>,
                }}
            />
        </div>
    );
};

export default CalendarAppPage;
