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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RightDrawer from './RightDrawer';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// events.ts
const resources = [
    {
        id: 11,
        createdAt: "2024-10-24T13:35:24.625Z",
        updatedAt: "2024-10-24T13:35:24.625Z",
        deletedAt: null,
        firstName: "Phyu",
        lastName: "Phyu",
        email: "pko553397@gmail.com",
        phone: null,
        dob: null,
        profilePictureUrl: null,
        gender: null,
        jobTitle: null,
        notes: null,
        startDate: null,
        experience: null,
        languageProficiency: null,
        memberId: null,
        type: "employee",
        averageRating: 0,
        role: "organisation",
        address: null,
        country: null
    },
    {
        id: 16,
        createdAt: "2024-10-25T04:30:00.574Z",
        updatedAt: "2024-10-25T04:30:00.574Z",
        deletedAt: null,
        firstName: "she",
        lastName: "Sirait",
        email: "phonyos126@gmail.com",
        phone: "+959425743536",
        dob: null,
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/88fc8903-4041-47f6-ae35-97209dafb210INBX_IMG.jpg",
        gender: null,
        jobTitle: null,
        notes: null,
        startDate: null,
        experience: null,
        languageProficiency: null,
        memberId: null,
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: null
    },
    {
        id: 12,
        createdAt: "2024-10-24T13:52:46.555Z",
        updatedAt: "2024-10-26T12:46:13.000Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "liying",
        email: "pko553397@gmail.com",
        phone: "+959425743563",
        dob: "2000-10-14",
        profilePictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl92M1TzYFhPX2VINOuyAAP43uc-gTORFkKbEgKvFXXT2KFHWs",
        gender: "female",
        jobTitle: "beauty",
        notes: "she is beauty",
        startDate: "2024-10-12",
        experience: 20,
        languageProficiency: ["english"],
        memberId: "zh-1",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 17,
        createdAt: "2024-10-26T07:00:46.019Z",
        updatedAt: "2024-10-26T07:00:46.019Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "liying",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-09",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/305b5f8d-68fe-4dac-9be0-d324103b6991INBX_IMG.jpg",
        gender: "female",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 18,
        createdAt: "2024-10-26T07:02:32.283Z",
        updatedAt: "2024-10-26T07:02:32.283Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "liying",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-10",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/ed039acc-5c41-4b29-8a2b-e043e0a65c53INBX_IMG.jpg",
        gender: "male",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 19,
        createdAt: "2024-10-26T07:03:00.384Z",
        updatedAt: "2024-10-26T07:03:00.384Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "liying",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-10",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/a4328606-fb5e-4630-b197-77215d598db7INBX_IMG.jpg",
        gender: "male",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 20,
        createdAt: "2024-10-26T07:03:13.053Z",
        updatedAt: "2024-10-26T07:03:13.053Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "liying",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-10",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/dc9d684e-2e46-4638-abf8-14bca32335daINBX_IMG.png",
        gender: "male",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 21,
        createdAt: "2024-10-26T07:06:32.376Z",
        updatedAt: "2024-10-26T07:06:32.376Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "LiYing",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-10",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/dc9d684e-2e46-4638-abf8-14bca32335daINBX_IMG.png",
        gender: "male",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    },
    {
        id: 22,
        createdAt: "2024-10-26T07:07:02.645Z",
        updatedAt: "2024-10-26T07:07:02.645Z",
        deletedAt: null,
        firstName: "zhao",
        lastName: "LiYing",
        email: "liying@gmail.com",
        phone: "+959425743536",
        dob: "2024-10-10",
        profilePictureUrl: "https://djiwkc53pq2w8.cloudfront.net/068e8f04-9ddd-4dc8-889a-e895f434abf7INBX_IMG.jfif",
        gender: "male",
        jobTitle: "sfds",
        notes: "for smile face",
        startDate: "2024-10-09",
        experience: 3,
        languageProficiency: ["english"],
        memberId: "1234",
        type: "employee",
        averageRating: 0,
        role: "member",
        address: null,
        country: "ca"
    }
];


export const myEvents = [
    {
        id: '1',
        start: new Date(2024, 9, 28, 9.5),
        end: new Date(2024, 9, 28, 10),
        title: 'Meeting with Alice',
        services: [
            {
                name: 'hair cut',
                duration: 30,
                price: 5000
            }
        ],
        resourceId: 22,
    },
    {
        id: '2',
        start: new Date(2024, 9, 29, 14),
        end: new Date(2024, 9, 29, 14.75),
        title: 'Consultation with Bob',
        services: [
            {
                name: "lip",
                duration: 45,
                price: 45000
            }
        ],
        resourceId: 21,
    },
];

export type NewAppointmentType = {
    resource: number,
    value: Date
}

const CalendarAppPage = () => {
    const [events, setEvents] = useState(myEvents);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>('day');
    const [makeNewAppointment, setMakeNewAppointment] = useState<NewAppointmentType | null>(null);
    const { setQuery } = useSetUrlParams();

    const filteredResources = () => {
        if (currentView == 'week') {
            return resources.filter((resource, index) => index == 0);
        };
        if (currentView == 'day') {
            return resources;
        }
    }

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const CustomResourceHeader = ({ label, resource }: any) => (
        <div className=" flex flex-col justify-center items-center ">
            <div className=' border-2 border-gray-300 rounded-full p-1 '>
                <Avatar className=' size-16 '>
                    <AvatarImage src={resource.profilePictureUrl} alt='he' className=' object-cover ' />
                    <AvatarFallback>he</AvatarFallback>
                </Avatar>
            </div>
            <span style={{ marginLeft: 8 }}>{label}</span>
        </div>
    );

    return (
        <>
            <div className="app-container-hh h-h-screen-minus-80 flex flex-col overflow-hidden w-full ">
                <Button >React Big Calendar POC</Button>
                <Calendar
                    className=' overflow-auto w-full'
                    localizer={localizer}
                    events={events}
                    style={{ height: '100%' }}
                    views={['week', 'day']}
                    view={currentView}
                    date={currentDate}
                    resources={filteredResources()}
                    resourceAccessor={"resourceId"}
                    resourceTitleAccessor={"firstName"}
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
                        toolbar: ({ label, onNavigate, onView, view }) => <CustomToolbar resources={resources} view={view} label={label} onNavigate={onNavigate} onView={onView} currentDate={currentDate} currentView={currentView} setCurrentDate={setCurrentDate} />,
                        timeSlotWrapper: (props: any) => <CustomTimeSlotWrapper setMakeNewAppointment={setMakeNewAppointment} resource={props.resource} event={props} value={props.value}>{props.children}</CustomTimeSlotWrapper>,
                        // eventWrapper: (props: any) => <div className=' z-10 relative h-full pointer-events-none ' children={props.children} />,
                        event: (props: any) => <div onClick={() => console.log(props)} >{props.children}</div>,
                        resourceHeader: CustomResourceHeader
                    }}
                />
            </div>
            <RightDrawer
                makeNewAppointment={makeNewAppointment}
                setMakeNewAppointment={setMakeNewAppointment}
            />
        </>
    );
};

export default CalendarAppPage;
