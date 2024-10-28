'use client'
import { Dispatch, useState } from 'react'
import { Plus, Search, User } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Modal from '@/components/modal/Modal'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { NewAppointmentType } from '../CalanderAppPage'

const clients = [
    { name: 'Jack Doe', email: 'jack@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'John Doe', email: 'john@example.com' },
]

const services = [
    {
        category: 'Nail Cleaning',
        items: [
            { name: 'nail color', duration: '30min', price: 'from MMK 5,000' },
            { name: 'cleaning nail and fancy nail', duration: '30min', price: 'from MMK 5,000' },
        ],
        color: 'pink',
    },
    {
        category: 'Hair & styling',
        items: [
            { name: 'Blow Dry', duration: '35min', price: 'MMK 35' },
            { name: 'Hair Color', duration: '1h 15min', price: 'MMK 57' },
            { name: 'Balayage', duration: '2h 30min', price: 'MMK 150' },
        ],
        color: 'blue',
    },
]

type Props = {
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    makeNewAppointment: NewAppointmentType;
}


export default function NewAppointment({ setMakeNewAppointment, makeNewAppointment }: Props) {
    const [clientSearch, setClientSearch] = useState('')
    const [serviceSearch, setServiceSearch] = useState('')
    const { deleteQuery } = useSetUrlParams();

    const handleClose = () => {
        setMakeNewAppointment(null)
    }

    return (
        <Modal onClose={() => handleClose()}>
            <div className=" flex w-auto h-screen lg:w-[800px] bg-gray-100">
                <div className=" w-1/2 p-6 bg-white border-r h-full overflow-y-auto ">
                    <h2 className="text-2xl font-bold mb-4">Select a client {makeNewAppointment.resource} {new Date(makeNewAppointment.value).getDate()}</h2>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search client or leave empty"
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-purple-600">
                            <div className="bg-purple-100 p-2 rounded-full mr-2">
                                <Plus className="h-5 w-5" />
                            </div>
                            Add new client
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-purple-600">
                            <div className="bg-purple-100 p-2 rounded-full mr-2">
                                <User className="h-5 w-5" />
                            </div>
                            Walk-In
                        </Button>
                        {clients.map((client) => (
                            <Button key={client.email} variant="ghost" className="w-full justify-start">
                                <Avatar className="h-10 w-10 mr-2">
                                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <div>{client.name}</div>
                                    <div className="text-sm text-gray-500">{client.email}</div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className=" w-1/2 p-6 bg-white h-full overflow-auto ">
                    <h2 className="text-2xl font-bold mb-4">Select a service</h2>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search by service name"
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-6">
                        {services.map((category) => (
                            <div key={category.category}>
                                <h3 className="text-lg font-semibold mb-2">
                                    {category.category} <span className="text-sm text-gray-500 font-normal">{category.items.length}</span>
                                </h3>
                                <div className="space-y-2">
                                    {category.items.map((service) => (
                                        <div key={service.name} className="flex items-center">
                                            <div className={`w-1 h-12 bg-${category.color}-400 mr-2`}></div>
                                            <div className="flex-1">
                                                <div>{service.name}</div>
                                                <div className="text-sm text-gray-500">{service.duration}</div>
                                            </div>
                                            <div className="text-right">{service.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}