'use client'

import { useEffect } from 'react'
import { Check, ArrowRight, User, Mail, Settings } from 'lucide-react'
import Link from 'next/link'
//@ts-ignore
import confetti from 'canvas-confetti'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function SuccessRegister() {
    useEffect(() => {
        // Trigger confetti on component mount
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }, [])

    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-white ">
            <div className=" w-full h-full px-3 md:px-10 overflow-y-auto  bg-gradient-to-b from-white to-[#FF66A1]/10">
                <div className=' py-20 '>
                    <Card className="w-full max-w-2xl mx-auto  ">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-[#FF66A1] rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-8 h-8 text-white" />
                                </div>

                                <h1 className="text-3xl font-bold text-[#FF66A1]">
                                    Welcome to Baranie!
                                </h1>

                                <p className="text-gray-600 max-w-md mx-auto">
                                    Your account has been successfully created. You&apos;re now ready to start using our services and manage your appointments.
                                </p>

                                <div className="space-y-6 mt-8">
                                    {/* Next Steps Section */}
                                    <div className="bg-white p-6 rounded-xl border space-y-4">
                                        <h2 className="font-semibold text-lg text-[#FF66A1]">Next Steps</h2>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#FF66A1]/10 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-[#FF66A1]" />
                                                </div>
                                                <span>Complete your business information</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#FF66A1]/10 rounded-full flex items-center justify-center">
                                                    <Settings className="w-4 h-4 text-[#FF66A1]" />
                                                </div>
                                                <span>Set up your services and team members</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#FF66A1]/10 rounded-full flex items-center justify-center">
                                                    <Mail className="w-4 h-4 text-[#FF66A1]" />
                                                </div>
                                                <span>Publish your business</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Quick Links Section */}
                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href="/profile">
                                                            <User className="mr-2 h-4 w-4" />
                                                            Edit Profile
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Complete your profile information</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href="/settings">
                                                            <Settings className="mr-2 h-4 w-4" />
                                                            Account Settings
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Manage your account settings</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div> */}

                                    {/* Action Button */}
                                    <Button
                                        className="w-full bg-[#FF66A1] hover:bg-[#FF66A1]/90 text-white"
                                        size="lg"
                                        asChild
                                    >
                                        <Link href="/login">
                                            Go to Login
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

