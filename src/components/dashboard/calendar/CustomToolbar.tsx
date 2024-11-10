'use client'
import { addDays, format, startOfWeek } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Include date picker styles
import { DropdownMenu } from '@/components/ui/dropdown-menu'; // Import DropdownMenu
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { NavigateAction, View } from 'react-big-calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Member } from '@/types/member';

interface CustomToolbarProps {
    label: string;
    onNavigate: (navigate: NavigateAction, date?: Date) => void;
    onView: (view: View) => void;
    view: View;
    currentDate: Date;
    currentView: string;
    setCurrentDate: (date: Date) => void;
    teamMembers: Member[];
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
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setCurrentDate(date);
        }
    };

    const getWeekRange = (date: Date) => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const end = addDays(start, 6);
        return `${format(start, "MMMM d")} - ${format(end, "d")}`;
    };

    return (
        <div className="rbc-toolbar relative z-[30] p-5 space-y-2">
            <div className="rbc-btn-group space-x-2">
                <button onClick={() => onNavigate('PREV')}>Previous</button>
                <button onClick={() => onNavigate('TODAY')}>Today</button>
                <button onClick={() => onNavigate('NEXT')}>Next</button>
            </div>
            <div className="rbc-toolbar-label">
                <DatePicker
                    selected={currentDate}
                    onChange={handleDateChange}
                    dateFormat={currentView === "day" ? "MMMM d, yyyy" : "'Week of' MMMM d"}
                    showWeekPicker={currentView === "week"}
                    customInput={
                        <button>
                            {currentView === "day"
                                ? format(currentDate, "MMMM d, yyyy")
                                : getWeekRange(currentDate)}
                        </button>
                    }
                    className=''
                    popperClassName=' '
                    calendarClassName=' '
                />
            </div>
            <div className="rbc-btn-group">
                <div className=' flex items-center space-x-2'>
                    <Select onValueChange={(e) => setQuery({ key: 'shown_member', value: e })}>
                        <SelectTrigger style={{ display: 'flex' }}>
                            <SelectValue placeholder="member" />
                        </SelectTrigger>
                        <SelectContent className=' max-h-[200px] '>
                            {currentView == "day" && (
                                <SelectItem value='all'>All</SelectItem>
                            )}
                            {teamMembers.map((member, index) => (
                                <SelectItem key={index} value={String(member.id)}>{member.firstName} {member.lastName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={view} onValueChange={(e) => onView(e as View)}>
                        <SelectTrigger style={{ display: 'flex' }} className="">
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="week">Week</SelectItem> */}
                            <SelectItem value="day">Day</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button style={{ display: 'flex' }}>
                        Add
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
