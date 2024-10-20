'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'

const initialSaleData = {
    saleNumber: 4,
    date: 'Sat 12 Oct 2024',
    itemsSold: {
        service: 'Manual payment',
        duration: '5 min',
        amount: 20000,
        teamMember: 'Mg Kaung'
    },
    tipCollected: {
        amount: 2000,
        toBeAllocated: 0,
        teamMember: 'Mg Kaung'
    },
    paymentCollected: {
        amount: 22000,
        method: 'cash',
        teamMember: 'Mg Kaung'
    }
}

export default function EditPaymentDetails() {
    const [saleData, setSaleData] = useState(initialSaleData);
    const router = useRouter();
    const handleClose = () => {
        router.push('/sales/payment')
    }

    return (
        <Modal onClose={handleClose}>
            <div className=" md:w-[600px] w-auto h-full  inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-xl font-bold">Edit sale details</CardTitle>
                            <p className="text-sm text-gray-500">Sale #{saleData.saleNumber}, {saleData.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Items sold</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p>{saleData.itemsSold.service}</p>
                                        <p className="text-sm text-gray-500">{saleData.itemsSold.duration} · {saleData.itemsSold.teamMember}</p>
                                    </div>
                                    <p className="font-semibold">MMK {saleData.itemsSold.amount.toLocaleString()}</p>
                                </div>
                                <div className="mt-2">
                                    <Label htmlFor="itemsSoldTeamMember">Team member</Label>
                                    <Input
                                        id="itemsSoldTeamMember"

                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Tip collected</h3>
                                <p className="text-sm">MMK {saleData.tipCollected.amount.toLocaleString()} tip collected</p>
                                <p className="text-sm text-gray-500">MMK {saleData.tipCollected.toBeAllocated.toLocaleString()} to be allocated</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <div className="flex-grow">
                                        <Label htmlFor="tipTeamMember">Team member</Label>
                                        <Input
                                            id="tipTeamMember"
                                            value={saleData.tipCollected.teamMember}

                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tipAmount">Amount</Label>
                                        <Input
                                            id="tipAmount"
                                            value={`MMK ${saleData.tipCollected.amount.toLocaleString()}`}

                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Payment collected</h3>
                                <p className="text-sm">MMK {saleData.paymentCollected.amount.toLocaleString()} {saleData.paymentCollected.method}</p>
                                <div className="mt-2">
                                    <Label htmlFor="paymentTeamMember">Team member</Label>
                                    <Input
                                        id="paymentTeamMember"
                                        value={saleData.paymentCollected.teamMember}

                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <Button variant="outline">Close</Button>
                            <Button>Save</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Modal>
    )
}