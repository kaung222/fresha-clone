"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function TimeLineCard() {
  const [schedule, setSchedule] = useState([
    {
      day: "Monday",
      slots: [
        {
          start: "9:00 AM",
          end: "10:00 AM",
          available: true,
          notes: "General checkups",
          assigned: "Dr. John Doe",
          availableBookings: 2,
        },
        {
          start: "10:30 AM",
          end: "12:00 PM",
          available: true,
          notes: "Routine appointments",
          assigned: null,
          availableBookings: 4,
        },
        {
          start: "1:30 PM",
          end: "3:00 PM",
          available: false,
          notes: "Out for lunch",
          assigned: null,
          availableBookings: 0,
        },
        {
          start: "3:30 PM",
          end: "5:00 PM",
          available: true,
          notes: "Follow-up visits",
          assigned: "Dr. Jane Smith",
          availableBookings: 3,
        },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        {
          start: "9:00 AM",
          end: "11:00 AM",
          available: true,
          notes: "General checkups",
          assigned: null,
          availableBookings: 5,
        },
        {
          start: "11:30 AM",
          end: "1:00 PM",
          available: false,
          notes: "Staff meeting",
          assigned: null,
          availableBookings: 0,
        },
        {
          start: "2:00 PM",
          end: "4:00 PM",
          available: true,
          notes: "Routine appointments",
          assigned: "Dr. John Doe",
          availableBookings: 2,
        },
        {
          start: "4:30 PM",
          end: "6:00 PM",
          available: true,
          notes: "Follow-up visits",
          assigned: null,
          availableBookings: 4,
        },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        {
          start: "9:00 AM",
          end: "10:30 AM",
          available: true,
          notes: "General checkups",
          assigned: "Dr. Jane Smith",
          availableBookings: 3,
        },
        {
          start: "11:00 AM",
          end: "12:30 PM",
          available: true,
          notes: "Routine appointments",
          assigned: null,
          availableBookings: 4,
        },
        {
          start: "2:00 PM",
          end: "3:30 PM",
          available: false,
          notes: "Out of office",
          assigned: null,
          availableBookings: 0,
        },
        {
          start: "4:00 PM",
          end: "5:30 PM",
          available: true,
          notes: "Follow-up visits",
          assigned: "Dr. John Doe",
          availableBookings: 2,
        },
      ],
    },
    {
      day: "Thursday",
      slots: [
        {
          start: "9:00 AM",
          end: "11:00 AM",
          available: true,
          notes: "General checkups",
          assigned: null,
          availableBookings: 4,
        },
        {
          start: "11:30 AM",
          end: "1:00 PM",
          available: true,
          notes: "Routine appointments",
          assigned: "Dr. Jane Smith",
          availableBookings: 3,
        },
        {
          start: "2:00 PM",
          end: "3:30 PM",
          available: true,
          notes: "Follow-up visits",
          assigned: null,
          availableBookings: 2,
        },
        {
          start: "4:00 PM",
          end: "5:30 PM",
          available: false,
          notes: "Out of office",
          assigned: null,
          availableBookings: 0,
        },
      ],
    },
    {
      day: "Friday",
      slots: [
        {
          start: "9:00 AM",
          end: "10:30 AM",
          available: true,
          notes: "General checkups",
          assigned: "Dr. John Doe",
          availableBookings: 3,
        },
        {
          start: "11:00 AM",
          end: "12:30 PM",
          available: true,
          notes: "Routine appointments",
          assigned: null,
          availableBookings: 4,
        },
        {
          start: "2:00 PM",
          end: "3:30 PM",
          available: true,
          notes: "Follow-up visits",
          assigned: "Dr. Jane Smith",
          availableBookings: 2,
        },
        {
          start: "4:00 PM",
          end: "5:30 PM",
          available: false,
          notes: "Out of office",
          assigned: null,
          availableBookings: 0,
        },
      ],
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">Doctor Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule?.map((day) => (
          <Card key={day.day} className="p-6">
            <CardHeader>
              <CardTitle>{day.day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {day.slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md ${
                      slot.available
                        ? "bg-green-100 text-green-900"
                        : "bg-red-100 text-red-900"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="font-medium">
                        {slot.start} - {slot.end}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          slot.available
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                        }`}
                      >
                        {slot.available ? "Available" : "Leave"}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {slot.notes}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Available Bookings: {slot.availableBookings}
                    </div>
                    {slot.assigned && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Assigned to: {slot.assigned}
                      </div>
                    )}
                    <div className="mt-2 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Assign
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
