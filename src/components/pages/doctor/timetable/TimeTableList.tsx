'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTimetablesOfDoctor } from '@/api/timetable/get-timetables';
import { useParams } from 'next/navigation';
import CircleLoading from '@/components/layout/circle-loading';

export function formatDay(day: number) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return null;
  }
}
type Props = {

}

const TimeTableList = (prop: Props) => {
  const { doctorId } = useParams();
  const { data, isLoading } = useGetTimetablesOfDoctor(String(doctorId));
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Max Bookings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (<TableRow className=' w-full rows'>
            <CircleLoading />
          </TableRow>)}
          {data?.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{formatDay(entry.day)}</TableCell>
              <TableCell>{entry.startTime}</TableCell>
              <TableCell>{entry.endTime}</TableCell>
              <TableCell>{entry.maxBookings}</TableCell>
              <TableCell>{entry.status}</TableCell>
              <TableCell>{entry.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TimeTableList