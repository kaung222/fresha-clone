'use client'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, ChevronDown, ChevronsDown } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const Appointment = (props: Props) => {
    const [activeTab, setActiveTab] = useState("completed")
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Appointment</h1>
            <Card>
                <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex justify-start items-center bg-transparent w-full gap-2 overflow-x-auto mb-6">
                            <TabsTrigger value="completed" className=' text-secondary-foreground'>Completed</TabsTrigger>
                            <TabsTrigger value="confirmed" className=' text-secondary-foreground'>Confirmed</TabsTrigger>
                            <TabsTrigger value="booked" className=' text-secondary-foreground'>Booked</TabsTrigger>
                            <AppDropdown trigger={(
                                <Button variant="outline">More <ChevronDown className=' size-4 ' /></Button>
                            )}>
                                <span className=" flex flex-col gap-2 ">
                                    <TabsTrigger value="arrived" className=' text-secondary-foreground'>Arrived</TabsTrigger>
                                    <TabsTrigger value="started" className=' text-secondary-foreground'>Started</TabsTrigger>
                                    <TabsTrigger value="cancelled" className=' text-secondary-foreground'>Cancelled</TabsTrigger>
                                    <TabsTrigger value="no-show" className=' text-secondary-foreground'>No Show</TabsTrigger>
                                </span>
                            </AppDropdown>
                            {/* <TabsTrigger value="more">More</TabsTrigger> */}
                        </TabsList>
                        <TabsContent value={activeTab} className="mt-6">
                            <div className="flex flex-col items-center justify-center text-center p-12">
                                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No appointments</h3>
                                <p className="text-gray-500 max-w-sm">
                                    No completed appointments have been scheduled with this client.{activeTab}
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}

export default Appointment