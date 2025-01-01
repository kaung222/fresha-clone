'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area'


export interface GuideStep {
    title: string
    description: string
    image: string
    alt: string
    contents: {
        label: number;
        text: string;
    }[]
}

type Props = {
    children: React.ReactNode;
    guideSteps: GuideStep[];
}

export function GuideIntro({ children, guideSteps }: Props) {
    const [open, setOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)


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

            {/* <Button onClick={() => setOpen(true)} variant="outline" className="bg-white text-[#FF66A1] border-[#FF66A1] hover:bg-[#FF66A1] hover:text-white">
                Open Guide
            </Button> */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="  w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] max-h-[100%] max-w-[100%] flex p-0 bg-gray-50 ">
                    <div className=' w-full flex flex-col p-5 '>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#FF66A1]">{guideSteps[currentStep].title}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className=' flex-1 px-4 '>
                            <div className="mt-4 border rounded-lg">
                                <Image
                                    src={guideSteps[currentStep].image}
                                    alt={guideSteps[currentStep].alt}
                                    width={1000}
                                    height={900}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <DialogDescription className="mt-4 text-base">
                                {guideSteps[currentStep].description}
                            </DialogDescription>
                            <div>
                                {guideSteps[currentStep].contents.map((content, index) => (
                                    <div key={index} className=' flex gap-4 '>
                                        <span>{content.label}</span>
                                        <span>{content.text}</span>
                                    </div>
                                ))}
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
                </DialogContent>
            </Dialog>
        </>
    )
}

