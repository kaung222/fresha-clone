import { Button } from '@/components/ui/button'
import { addDays, format, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import DatePicker from 'react-datepicker'

type Props = {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

const DateController = ({ currentDate, setCurrentDate }: Props) => {

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setCurrentDate(date);
        }
    }
    const getWeekRange = (date: Date) => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const end = addDays(start, 6);
        return `${format(start, "MMMM d")} - ${format(end, "d")}`;
    };

    const goToPreviousWeek = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 7); // Move back by one week
            return newDate;
        });
    };
    const goToNextWeek = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 7); // Move forward by one week
            return newDate;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date()); // Reset to today
    };

    return (
        <>
            <div className="rounded-lg h-10 flex items-center justify-start ">
                <Button onClick={goToPreviousWeek} variant="ghost" size="icon" className=" border rounded-l-md rounded-r-none border-thinBorder ">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button onClick={goToToday} variant="ghost" className=" border-thinBorder border rounded-none ">Today</Button>
                <div className="text-sm p-2 font-medium border border-thinBorder flex justify-center items-center h-10 ">
                    <div>
                        <DatePicker className=" z-[30] "
                            selected={currentDate}
                            onChange={handleDateChange}
                            dateFormat={"'Week of' MMMM d"}
                            showWeekPicker={true}
                            customInput={
                                <button>
                                    {getWeekRange(currentDate)}
                                </button>
                            }
                        />
                    </div>
                </div>
                <Button onClick={goToNextWeek} variant="ghost" size="icon" className=" rounded-l-none border border-thinBorder rounded-r-md ">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </>
    )
}

export default DateController