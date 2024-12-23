'use client'
import { addDays, format, startOfWeek } from 'date-fns';
import DatePicker from "react-datepicker";
import { DropdownMenu } from '@/components/ui/dropdown-menu'; // Import DropdownMenu
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { NavigateAction, View } from 'react-big-calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Member, MemberForAll } from '@/types/member';
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import "react-datepicker/dist/react-datepicker.css";
import "./custom-date-picker.css"

interface CustomToolbarProps {
    label: string;
    onNavigate: (navigate: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    view: View;
    currentDate: Date;
    currentView: string;
    setCurrentDate: (date: Date) => void;
    teamMembers: MemberForAll[];
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
    label,
    onNavigate,
    onView,
    view,
    currentDate,
    currentView,
    setCurrentDate,
    teamMembers
}) => {
    const { setQuery } = useSetUrlParams()
    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setCurrentDate(date);
            const dateString = format(date, "yyyy-MM-dd")
            setQuery({ key: 'startDate', value: dateString })
            setQuery({ key: 'endDate', value: dateString })
        }
    };

    const getWeekRange = (date: Date) => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const end = addDays(start, 6);
        return `${format(start, "MMMM d")} - ${format(end, "d")}`;
    };

    return (
        <div style={{ marginBottom: '0px' }} className="rbc-toolbar relative z-[2] p-1 md:px-2 space-y-2 ">
            <div className="rbc-btn-group space-x-2 ">
                <Button onClick={() => onNavigate('PREV')}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous day</span>
                </Button>
                <Button onClick={() => onNavigate('TODAY')}>Today</Button>
                <Button onClick={() => onNavigate('NEXT')}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next day</span>
                </Button>
            </div>
            <div className="rbc-toolbar-label">
                <div className=" flex items-center gap-2 justify-end ">
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    style={{ display: 'flex', gap: 2, alignItems: 'center' }}
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="start-date"
                                >
                                    <CalendarIcon className=" h-4 w-4 opacity-70" />

                                    {currentDate ? (
                                        <span>{format(currentDate, "PPP")}</span>
                                    ) : (
                                        <span className="text-muted-foreground">Today</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={currentDate}
                                    onSelect={(e) => handleDateChange(e)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Select onValueChange={(e) => setQuery({ key: 'shown_member', value: e })}>
                        <SelectTrigger style={{ display: 'flex' }} className=" w-[180px] ">
                            <SelectValue placeholder={(
                                <span className=" flex items-center gap-1 ">
                                    <Users className=' w-4 h-4 ' /> <span>All Members</span>
                                </span>
                            )} />
                        </SelectTrigger>
                        <SelectContent className=' max-h-[200px] '>
                            {currentView == "day" && (
                                <SelectItem value='all'>All Members</SelectItem>
                            )}
                            {teamMembers.map((member, index) => (
                                <SelectItem key={index} value={String(member.id)}>{member.firstName} {member.lastName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    );
};



// <div className="rbc-btn-group">
//                 <div className=' flex items-center space-x-2'>
//                     {/* <Select onValueChange={(e) => setQuery({ key: 'shown_member', value: e })}>
//                         <SelectTrigger style={{ display: 'flex' }}>
//                             <SelectValue placeholder="member" />
//                         </SelectTrigger>
//                         <SelectContent className=' max-h-[200px] '>
//                             {currentView == "day" && (
//                                 <SelectItem value='all'>All</SelectItem>
//                             )}
//                             {teamMembers.map((member, index) => (
//                                 <SelectItem key={index} value={String(member.id)}>{member.firstName} {member.lastName}</SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select> */}
//                     {/* <Select value={view} onValueChange={(e) => onView(e as View)}>
//                         <SelectTrigger style={{ display: 'flex' }} className="">
//                             <SelectValue placeholder="View" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="week">Week</SelectItem>
//                             <SelectItem value="day">Day</SelectItem>
//                         </SelectContent>
//                     </Select> */}
//                     {/* <Button style={{ display: 'flex' }}>
//                         Add
//                         <ChevronDown className="ml-2 h-4 w-4" />
//                     </Button> */}
//                 </div>
//             </div>
