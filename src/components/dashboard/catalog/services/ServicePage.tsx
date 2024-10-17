import { Button } from '@/components/ui/button'
import { ChevronDown, Menu, MoreVertical } from 'lucide-react'
import React from 'react'

type Props = {}


const services = [
    {
        category: "Nail Cleaning",
        name: "cleaning nail and fancy nail",
        duration: "30min",
        price: "MMK 5,000",
        description: "It will make your hand beauty double"
    },
    {
        category: "Hair & styling",
        name: "Hair Color",
        duration: "1h 15min",
        price: "MMK 57"
    },
    {
        category: "Hair & styling",
        name: "Haircut",
        duration: "45min",
        price: "MMK 40"
    },
]

const ServicePage = (props: Props) => {
    return (
        <>
            <div className="flex-1">
                {services.map((service, index) => (
                    <div key={index} className="mb-6">
                        {index === 0 || services[index - 1].category !== service.category ? (
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">{service.category}</h2>
                                <Button variant="ghost" size="sm" className=' hidden md:block '>
                                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className=' block md:hidden ' >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : null}
                        <div className="bg-white border relative rounded-lg p-4 flex justify-between items-start">
                            <div className=' w-1 bg-pink-300 h-full absolute top-0 left-0 '></div>
                            <div>
                                <h3 className="font-semibold">{service.name}</h3>
                                <p className="text-sm text-gray-600">{service.duration}</p>
                                {service.description && (
                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">
                                    {service.price.startsWith('from') ? 'from ' : ''}
                                    <span className="text-lg">{service.price.replace('from ', '')}</span>
                                </p>
                                <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServicePage