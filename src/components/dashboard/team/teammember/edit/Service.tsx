import { useState } from 'react'
import { Bell, ChevronDown, Plus, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'

const serviceCategories = [
    "All Services",
    "Hair and styling",
    "Nail spa",
    "Face Spa",
    "Foot massage"
]

const services = [
    {
        category: "Hair and styling",
        items: [
            { name: "Haircut (Men, Women, Children)", duration: "35min", price: "MMK 5000" },
            { name: "Hair Coloring", duration: "1h", price: "from MMK 15000" },
            { name: "Highlights/Balayage", duration: "1h 30m", price: "from MMK 15000" },
            { name: "Hair Extensions", duration: "2h", price: "from MMK 35000" },
        ]
    },
    {
        category: "Nail Spa",
        items: [
            { name: "Classic Manicure", duration: "35min", price: "MMK 5000" },
            { name: "Classic Pedicure", duration: "1h", price: "from MMK 15000" },
            { name: "Gel Manicure/Pedicure", duration: "1h 30m", price: "from MMK 15000" },
        ]
    }
]

type Props = {
}

export default function AddTeamMemberService({ }: Props) {
    const [activeCategory, setActiveCategory] = useState("All Services")
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const form = useForm()

    const toggleService = (serviceName: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(name => name !== serviceName)
                : [...prev, serviceName]
        )
    }

    return (
        <div className="flex-1 h-full overflow-auto">
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-500 mb-6">Select the services this team member offers.</p>

            <div className="flex space-x-2 mb-6">
                {serviceCategories.map(category => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="space-y-6">
                {services.map(serviceCategory => (
                    <div key={serviceCategory.category}>
                        <Checkbox
                            id={serviceCategory.category}
                            checked={serviceCategory.items.every(item => selectedServices.includes(item.name))}
                            onCheckedChange={() => {
                                const allSelected = serviceCategory.items.every(item => selectedServices.includes(item.name))
                                if (allSelected) {
                                    setSelectedServices(prev => prev.filter(name => !serviceCategory.items.some(item => item.name === name)))
                                } else {
                                    setSelectedServices(prev => [...prev, ...serviceCategory.items.map(item => item.name)])
                                }
                            }}
                        />
                        <label htmlFor={serviceCategory.category} className="ml-2 font-semibold">
                            {serviceCategory.category}
                        </label>
                        <div className="ml-6 mt-2 space-y-2">
                            {serviceCategory.items.map(item => (
                                <div key={item.name} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id={item.name}
                                            checked={selectedServices.includes(item.name)}
                                            onCheckedChange={() => toggleService(item.name)}
                                        />
                                        <label htmlFor={item.name} className="ml-2">
                                            {item.name}
                                            <span className="text-gray-500 text-sm ml-2">{item.duration}</span>
                                        </label>
                                    </div>
                                    <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}