'use client';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, ResourceHeaderProps, View } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { format, parse, startOfWeek, getDay, addDays, intervalToDuration } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomTimeSlotWrapper } from './CustomTimeSlotWrapper';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RightDrawer from './RightDrawer';
import { GetTeamMember } from '@/api/member/get-teammember';
import { GetAllAppointments } from '@/api/appointment/get-all-appointment';
import { Member } from '@/types/member';
import { colorOfStatus, getDateByDayAndDuration, shortName } from '@/lib/utils';
import { AppointmentEvent, AppointmentForAll } from '@/types/appointment';
import TooltipApp from '@/components/common/tool-tip-sidebar';
import PageLoading from '@/components/common/page-loading';
import { CustomToolbar } from './CustomToolBars';
import { anyMember } from '@/lib/data';
import ErrorPage from '@/components/common/error-state';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });




export type NewAppointmentType = {
    resource: string,
    value: Date
}

const blockTime: any = {
    memberId: 15,
    id: 1234,
    start: new Date('Sun Dec 01 2024 11:00:00'),
    end: new Date('Sun Dec 01 2024 12:00:00'),
    main: {
        status: 'completed'
    }


}

const CalendarAppPage = () => {
    const { getQuery, setQuery } = useSetUrlParams();
    const initialDateString = getQuery('startDate') || format(new Date(), "yyyy-MM-dd")
    const [currentDate, setCurrentDate] = useState(new Date(initialDateString));
    const [currentView, setCurrentView] = useState<View>('day');
    const [makeNewAppointment, setMakeNewAppointment] = useState<NewAppointmentType | null>(null);
    const shownMember = getQuery('shown_member');
    const { data: allTeamMembers, isLoading } = GetTeamMember();
    const { data: allAppointments } = GetAllAppointments();

    useEffect(() => {
        // Select all elements with the rbc-event class
        const eventElements = document.querySelectorAll('.rbc-event');

        // Apply inline z-index style to each event element
        eventElements.forEach((element) => {
            //@ts-ignore
            element.style.zIndex = '2'; // Set z-index higher than 1
        });
    }, []);

    const filteredTeamMember = () => {
        if (allTeamMembers) {
            const allMembers = [anyMember, ...allTeamMembers];

            if (currentView == 'week') {
                return (shownMember && shownMember != 'all') ? allMembers.filter((member, index) => String(member.id) == shownMember) : allTeamMembers.filter((member, index) => index == 0);
            };

            if (currentView == 'day') {
                return (shownMember && shownMember != 'all') ? allMembers.filter((member) => String(member.id) == shownMember) : allMembers;
            }
        }
    }

    const filterArray = filteredTeamMember()

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
        const dateString = format(newDate, "yyyy-MM-dd")
        setQuery({ key: 'startDate', value: dateString })
        setQuery({ key: 'endDate', value: dateString })
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const CustomResourceHeader = ({ label, resource }: ResourceHeaderProps<Member>) => (
        <div className=" flex flex-row  justify-center items-center ">
            <div className=' border-2 border-brandColorLight rounded-full p-1 '>
                <Avatar className=' size-8 md:size-10  '>
                    <AvatarImage src={resource.profilePictureUrl} alt={shortName(resource.firstName)} className=' object-cover bg-brandColorLight/80 ' />
                    <AvatarFallback className=" bg-brandColorLight/80 ">{shortName(resource.firstName)}</AvatarFallback>
                </Avatar>
            </div>
            <span style={{ marginLeft: 8 }} className=" font-semibold ">{resource.firstName}</span>
        </div>
    );

    const CustomEventComponent = ({ event }: { event: AppointmentEvent }) => {
        const startTime = format(event.start, 'HH:mm');
        const endTime = format(event.end, 'HH:mm');
        const duration = intervalToDuration({ start: 0, end: event.endTime });
        console.log(event)
        return (
            <>
                {event.appointmentId ? (
                    <TooltipApp trigger={(
                        <span className=' flex flex-col h-full '>
                            <span className=' flex justify-between w-full  '>
                                <span className=' font-bold text-sm'>{event.main?.username}</span>
                                {/* <span className=' font-medium '>#{event.token}</span> */}
                            </span>
                            <span className=' font-text text-sm '>{event.main?.notes}</span>
                        </span>
                    )}>
                        <div className=' bg-white space-y-3 rounded-[15px] w-[250px]  '>
                            <div style={{ background: `${colorOfStatus(event.main?.status)}` }} className=' h-10 p-4 flex justify-between items-center  font-semibold text-white '>
                                <div>{startTime} - {endTime}</div>
                                <div>{event.main?.status}</div>
                            </div>
                            <div className=' p-4 flex items-center gap-4 '>
                                <Avatar className=' size-16 '>
                                    <AvatarImage src={event.main?.profilePicture} alt={shortName(event.main.username)} className=' object-cover ' />
                                    <AvatarFallback>{shortName(event.main?.username)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className=" font-bold text-xl ">{event.main?.username} </h1>
                                    <p className=" text-gray-500  ">{event.main?.phone}</p>
                                </div>
                            </div>
                            <div className=' p-4 h-10 flex justify-between items-center '>
                                <div className=" font-semibold ">{duration.hours ? duration.hours : '0'} hr {duration.minutes} min</div>
                                <div className=' flex gap-1 items-center '>
                                    <span className=' font-bold '>MMK</span>
                                    <span>{event.price}</span>
                                </div>
                            </div>
                        </div>
                    </TooltipApp>
                ) : (
                    <span className=' flex flex-col h-full '>
                        <span className=' flex justify-between w-full  '>
                            <span className=' font-bold text-sm'>block</span>
                            {/* <span className=' font-medium '>#{event.id}</span> */}
                        </span>
                        <span className=' font-text text-sm '>time</span>
                    </span>
                )}
            </>
        )
    }

    const eventStyleGetter = (event: AppointmentEvent) => {
        const backgroundColor = colorOfStatus(event.main.status);
        return {
            style: {
                backgroundColor,
                color: "#FFFFFF", // White text for dark background
                borderRadius: "5px",
                padding: "5px",
            },
        };
    };

    // const defaultIdForNullMemberIdAppointments = (allAppointments: AppointmentForAll[] | undefined) => {
    //     return allAppointments?.map((app) => app.memberId ? app : { ...app, memberId: -1 })
    // }

    const separatedAppointments = (appointments: AppointmentForAll[]): AppointmentEvent[] => {
        const bookingItems = appointments.flatMap((appointment) => appointment.bookingItems.map((item) => {
            const result = { ...item, date: appointment.date, main: appointment, start: getDateByDayAndDuration(appointment.date, item.startTime), end: getDateByDayAndDuration(appointment.date, item.endTime) }
            return result
        })).map(item => item.memberId ? item : { ...item, memberId: "-1" });
        return [...bookingItems, blockTime]

    }

    return (
        <>
            <div className="app-container-hh h-h-screen-minus-80 flex flex-col overflow-hidden w-full ">
                {isLoading ? (
                    <PageLoading />
                ) : (
                    allTeamMembers ? (
                        <>
                            <Calendar
                                className=' overflow-auto w-full'
                                localizer={localizer}
                                events={separatedAppointments(allAppointments || [])}
                                style={{ height: '100%' }}
                                views={['day']}
                                view={currentView}
                                date={currentDate}
                                resources={filteredTeamMember()}
                                resourceAccessor={(event) => event.memberId}
                                resourceTitleAccessor={"firstName"}
                                timeslots={2}
                                step={15}
                                toolbar={true}
                                formats={{
                                    dayFormat: (date) => format(date, 'd EEEE'),
                                }}
                                onNavigate={handleNavigate}
                                onView={handleViewChange}
                                onSelectEvent={(event) => setQuery({ key: 'detail', value: event.appointmentId.toString() })}
                                eventPropGetter={eventStyleGetter}
                                components={{
                                    toolbar: ({ label, onNavigate, onView, view }) => <CustomToolbar teamMembers={allTeamMembers} view={view} label={label} onNavigate={onNavigate} onView={onView} currentDate={currentDate} currentView={currentView} setCurrentDate={setCurrentDate} />,
                                    timeSlotWrapper: (props: any) => <CustomTimeSlotWrapper setMakeNewAppointment={setMakeNewAppointment} resource={props.resource} event={props} value={props.value}>{props.children}</CustomTimeSlotWrapper>,
                                    // eventWrapper: (props: any) => <div className=' z-10 relative h-full pointer-events-none ' children={props.children} />,
                                    event: CustomEventComponent,
                                    resourceHeader: CustomResourceHeader,
                                }}
                            />
                            <RightDrawer
                                makeNewAppointment={makeNewAppointment}
                                setMakeNewAppointment={setMakeNewAppointment}
                                allMember={allTeamMembers}
                            />
                        </>
                    ) : !allAppointments && !allTeamMembers && (
                        <ErrorPage />
                    )
                )}
            </div>
        </>
    );
};

export default CalendarAppPage;
