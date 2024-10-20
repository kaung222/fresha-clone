import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}
const clientData = {
    name: "Hla Thaung",
    email: "hlathaung@gmail.com",
    createdAt: "18 Oct 2024",
    totalSale: 0,
    appointments: 1,
    rating: "-",
    cancelled: 0,
    noShow: 0,
}

const OverView = (props: Props) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Sale</h3>
                            <p className="text-2xl font-bold">MMK {clientData.totalSale}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Appointments</h3>
                                <p className="text-2xl font-bold">{clientData.appointments}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                                <p className="text-2xl font-bold">{clientData.rating}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Cancelled</h3>
                            <p className="text-2xl font-bold">{clientData.cancelled}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">No Show</h3>
                            <p className="text-2xl font-bold">{clientData.noShow}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default OverView