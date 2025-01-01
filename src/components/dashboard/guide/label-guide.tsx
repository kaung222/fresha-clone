'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import GuideSteps from './guide-steps'

// interface GuideStep {
//     title: string
//     description: string
// }

// const guideSteps: GuideStep[] = [
//     {
//         title: "Welcome to Baranie",
//         description: "Baranie is your all-in-one platform for managing appointments, clients, and your beauty business. Let's walk through the key features!"
//     },
//     {
//         title: "Managing Appointments",
//         description: "Easily schedule, reschedule, and track all your appointments in one place. Our calendar view gives you a clear overview of your day and week."
//     },
//     {
//         title: "Client Management",
//         description: "Keep track of your clients' preferences, history, and contact information. Build stronger relationships and provide personalized service."
//     },
//     {
//         title: "Business Insights",
//         description: "Get valuable insights into your business performance. Track revenue, popular services, and client retention to make informed decisions."
//     },
//     {
//         title: "Online Booking",
//         description: "Allow clients to book appointments online 24/7. Sync with your availability to ensure a smooth booking process."
//     }
// ]

type Props = {
    children: React.ReactNode;
    currentIndex: number;
}

export function LabelGuide({ children, currentIndex }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] max-h-[100%] max-w-[100%] flex p-0 bg-gray-50">
                    <GuideSteps currentIndex={currentIndex} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    )
}

