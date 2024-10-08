'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TimeTableList from './TimeTableList'
import CreateTimetableDialog from './CreateDialog'

// Mock data for the timetable
const initialTimetable = [
  { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', maxBookings: 8, status: 'Open', note: 'Regular hours' },
  { id: 2, day: 'Tuesday', startTime: '10:00', endTime: '18:00', maxBookings: 7, status: 'Open', note: 'Late start' },
  { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '15:00', maxBookings: 6, status: 'Limited', note: 'Half day' },
]

type TimetableEntry = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  status: string;
  note: string;
}

export default function DoctorTimetable() {



  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Doctor&apos;s Timetable</h3>
        <CreateTimetableDialog />
      </div>
      <TimeTableList />
    </div>
  )
}