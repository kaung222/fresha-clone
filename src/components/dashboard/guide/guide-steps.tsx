'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'


interface GuideStep {
    title: string
    description: string
    purpose?: string
    guide?: string
    note?: string
}

const guideSteps: GuideStep[] = [
    {
        title: "Welcome to Baranie",
        description: "Baranie is your all-in-one platform for managing appointments,members, clients, and your beauty business. Let's walk through the key features!",
    },
    {
        title: "Home (overview)",
        description: "Get valuable insights into your business performance. Track revenue, popular services, and member performance to make informed decisions.",
        purpose: "Access the main dashboard with a quick overview of your business performance.",
        guide: "You can change month by selecting month."
    },
    {
        title: "Calendar (Managing Appointments)",
        description: "Easily schedule, reschedule, and track all your appointments in one place. Our calendar view gives you a clear overview appointment scheduled on each day.",
        purpose: "Manage your schedule efficiently with a visual overview of appointments and tasks.",
        guide: "Click on any date to view or add appointments.",
        note: "Appointments in calendar are shown according to schedule date and time. And, appointments in sales are shown according to booked-date."
    },
    {
        title: "Sales (Sale data)",
        description: "At appointment, all appointments booked on this day/days can be seen, managed. Also track record of your product that have been sold at product sale.",
        purpose: "Track and manage sales data and performance.",
    },
    {
        title: "Appointments (Managing Appointments)",
        description: "All appointments booked on this day/days can be seen, managed.",
        purpose: "Manage customer appointments seamlessly.",
        guide: "Quickly reschedule, confirm, or cancel bookings from this section.",
        note: "Appointments in sales are shown according to booked-date."
    },
    {
        title: "Product Sales (Managing product sale)",
        description: "Track record of your product that have been sold at product sale.",
        purpose: "Keep track of inventory and product sales performance.",
        guide: " Update product stock and pricing regularly for accuracy.",
        note: "Appointments in sales are shown according to booked-date."

    },
    {
        title: "Services List",
        description: "View, add, and manage the services and packages offered by your business.",
        purpose: "View, add, and manage the services and packages offered by your business.",
        guide: "Highlight promotions and discounted services and packages here."
    },
    {
        title: "Category (service category)",
        description: "First of all , create category first before service is created.",
        purpose: "Organize your services into clear categories.",
        guide: "Proper categorization helps clients find services faster."
    },
    {
        title: "Products",
        description: "First of all , create category first before service is created.",
        purpose: "Manage your product, catalog, brand and track inventory.",
        guide: "Ensure popular products are always in stock."
    },
    {
        title: "Team Members Management",
        description: "Keep track of your team member performance, commissions. And, manage your member information.",
        purpose: "Manage staff profiles, job title, and commission.",
        guide: "Assign specific commission to ensure proper commission access."
    },
    {
        title: "Clients Management",
        description: "Usual client for quick appointment creation by business.",
        purpose: "Manage client for quick add in appointment data.",
        guide: "Be include valid phone and email for keeping contact."
    },
    {
        title: "Scheduling (team members)",
        description: "Plan and optimize your team's schedules.",
        purpose: "For online booking, make sure work day of team members.",
        guide: "Avoid overlaps or missed appointments with proper scheduling."
    },
    {
        title: "Close Days",
        description: "Shop close day like christmas or vacation.",
        purpose: "In online booking, customer would know your unusual close day. So it make sure to book online in opening day.",
        guide: "Preset close day for about a week or two week before that day."
    },
    {
        title: "Publication",
        description: "For online booking, your business need to public to customer side.",
        purpose: "Set business detail info, location and opening hours.",
        guide: "Keep online on opening hours for better trust by customer."
    },
    {
        title: "Payments",
        description: "Result payment earned from appointment complete and product sale.",
        purpose: "Track your overall payment-income.",
        guide: "Need to complete appointment to add income for the appointment."
    },
    {
        title: "Mail",
        description: "Track mail sended to customer and team members.",
        purpose: "Communicate directly with clients and team members",
        guide: "Use automated emails for appointment reminders."
    },
    {
        title: "Contact Us",
        description: "For better user experience and problem, contact us and suggest if you have problem",
        purpose: "Reach out for technical support or business inquiries.",
        guide: "Provide clear contact details for urgent support."
    },
]

type Props = {
    currentIndex: number;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const GuideSteps = ({ currentIndex, setOpen }: Props) => {
    const [currentStep, setCurrentStep] = useState(currentIndex || 0)
    const handleClose = () => {
        setOpen(false)
    }

    const handleNext = () => {
        if (currentStep < guideSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleClose()
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <>
            <div className=' w-full flex flex-col p-5 min-h-[350px] '>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#FF66A1]">{guideSteps[currentStep].title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className=' flex-1 px-4 flex flex-col gap-2 text-lg '>
                    <DialogDescription className="mt-4 text-base">
                        {guideSteps[currentStep].description}
                    </DialogDescription>
                    <div>
                        {guideSteps[currentStep].purpose && (
                            <div className=' flex gap-4 '>
                                <span className=' font-semibold '>Purpose:</span>
                                <span>{guideSteps[currentStep].purpose}</span>
                            </div>
                        )}
                        {guideSteps[currentStep].guide && (
                            <div className=' flex gap-4 '>
                                <span className=' font-semibold '>Guide Tip:</span>
                                <span>{guideSteps[currentStep].guide}</span>
                            </div>
                        )}
                        {guideSteps[currentStep].note && (
                            <div className=' flex gap-4 text-orange-400 '>
                                <span>note:</span>
                                <span>{guideSteps[currentStep].note}</span>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <DialogFooter className="flex justify-between flex-row items-center mt-auto pt-5">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="bg-white text-[#FF66A1] border-[#FF66A1] hover:bg-[#FF66A1] hover:text-white"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                        {currentStep + 1} of {guideSteps.length}
                    </span>
                    <Button onClick={handleNext} className="bg-[#FF66A1] hover:bg-[#FF66A1]/90 text-white">
                        {currentStep === guideSteps.length - 1 ? 'Finish' : 'Next'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </DialogFooter>
            </div>
        </>
    )
}

export default GuideSteps