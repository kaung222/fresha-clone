'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus, User, UserPlus, Pencil } from "lucide-react"

const clientData = {
    name: "Hla Thaung",
    email: "hlathaung@gmail.com",
    createdAt: "15 Oct 2024",
    phoneNumber: "+959 881262757",
    dateOfBirth: "13 October 2005",
    country: "Myanmar",
    jobTitle: "Beauty care",
    homeAddress: "285 Bus Stop Road, Secunderabad (West Marredpally), Father Balaiah 500026, Hyderabad India",
    workAddress: "11 Flover, Mumbai (Kumbharwada), Maharashtra, Kurla Division India",
    employmentType: "Employee",
    teamMemberId: "12354",
}


type Props = {}

const ClientDetail = (props: Props) => {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Client Details</h1>
                <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Personal</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Full name</h3>
                            <p>{clientData.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p>{clientData.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone number</h3>
                            <p>{clientData.phoneNumber}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Date of birth</h3>
                            <p>{clientData.dateOfBirth}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Country</h3>
                            <p>{clientData.country}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Job title</h3>
                            <p>{clientData.jobTitle}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Home</h3>
                            <p>{clientData.homeAddress}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Work</h3>
                            <p>{clientData.workAddress}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Work Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Employment</h3>
                            <p>{clientData.createdAt} - present</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Employment type</h3>
                            <p>{clientData.employmentType}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Team member ID</h3>
                            <p>{clientData.teamMemberId}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Date of birth</h3>
                            <p>{clientData.dateOfBirth}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ClientDetail