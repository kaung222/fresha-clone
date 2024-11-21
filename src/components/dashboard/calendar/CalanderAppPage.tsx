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
import { getDateByDayAndDuration, shortName } from '@/lib/utils';
import { AppointmentEvent } from '@/types/appointment';
import TooltipApp from '@/components/common/tool-tip-sidebar';
import PageLoading from '@/components/common/page-loading';
import { CustomToolbar } from './customToolbar';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });




export type NewAppointmentType = {
    resource: number,
    value: Date
}

const CalendarAppPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>('day');
    const [makeNewAppointment, setMakeNewAppointment] = useState<NewAppointmentType | null>(null);
    const { getQuery, setQuery } = useSetUrlParams();
    const shownMember = getQuery('shown_member');
    const { data: allTeamMembers, isLoading } = GetTeamMember();
    const { data: allAppointments } = GetAllAppointments(currentDate);

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
            if (currentView == 'week') {

                return (shownMember && shownMember != 'all') ? allTeamMembers.filter((member, index) => String(member.id) == shownMember) : allTeamMembers.filter((member, index) => index == 0);
            };

            if (currentView == 'day') {
                return (shownMember && shownMember != 'all') ? allTeamMembers.filter((member) => String(member.id) == shownMember) : allTeamMembers;
            }
        }
    }

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const CustomResourceHeader = ({ label, resource }: ResourceHeaderProps<Member>) => (
        <div className=" flex flex-col justify-center items-center ">
            <div className=' border-2 border-gray-300 rounded-full p-1 '>
                <Avatar className=' size-16 '>
                    <AvatarImage src={resource.profilePictureUrl} alt={shortName(resource.firstName)} className=' object-cover ' />
                    <AvatarFallback>{shortName(resource.firstName)}</AvatarFallback>
                </Avatar>
            </div>
            <span style={{ marginLeft: 8 }}>{resource.firstName} {resource.lastName}</span>
        </div>
    );

    const CustomEventComponent = ({ event }: { event: AppointmentEvent }) => {
        const startTime = format(event.start, 'HH:mm');
        const endTime = format(event.end, 'HH:mm');
        const duration = intervalToDuration({ start: 0, end: event.totalTime });
        return (
            <TooltipApp trigger={(
                <span className=' flex flex-col h-full'>
                    <span className=' font-bold  text-sm '>{event.username}</span>
                    <span className=' font-text text-sm '>{event.notes}</span>
                </span>
            )}>
                <div className=' bg-white space-y-3 rounded-[15px] w-[250px]  '>
                    <div className=' h-10 p-4 flex justify-between items-center bg-blue-500 font-semibold text-white '>
                        <div>{startTime} - {endTime}</div>
                        <div>{event.status}</div>
                    </div>
                    <div className=' p-4 flex items-center gap-4 '>
                        <Avatar className=' size-16 '>
                            <AvatarImage src={'event'} alt={shortName(event.username)} className=' object-cover ' />
                            <AvatarFallback>{shortName(event.username)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className=" font-bold text-xl ">{event.username} </h1>
                            <p className=" text-gray-500  ">{event.phone}</p>
                        </div>
                    </div>
                    <div className=' p-4 h-10 flex justify-between items-center '>
                        <div className=" font-semibold ">{duration.hours ? duration.hours : '0'} hr {duration.minutes} min</div>
                        <div className=' flex gap-1 items-center '>
                            <span className=' font-bold '>MMK</span>
                            <span>{event.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </TooltipApp>
        )
    }

    return (
        <>
            <div className="app-container-hh h-h-screen-minus-80 flex flex-col overflow-hidden w-full ">
                {isLoading ? (
                    <PageLoading />
                ) : (
                    allTeamMembers && (
                        <>
                            <Calendar
                                className=' overflow-auto w-full'
                                localizer={localizer}
                                events={allAppointments?.map((event) => ({ ...event, start: getDateByDayAndDuration(event.date, event.startTime), end: getDateByDayAndDuration(event.date, event.endTime) }))}
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
                                onSelectEvent={(event) => setQuery({ key: 'detail', value: event.id.toString() })}
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
                    )
                )}
            </div>
        </>
    );
};

export default CalendarAppPage;
