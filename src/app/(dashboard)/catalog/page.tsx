import { ChevronDown, ChevronLeft, MoreVertical, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
    { name: "All categories", count: 5 },
    { name: "Nail Cleaning", count: 1 },
    { name: "Hair & styling", count: 4 },
]

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

export default function ServiceMenu() {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Service menu</h1>
                        <p className="text-gray-600">
                            View and manage the services offered by your business.
                            <a href="#" className="text-blue-600 hover:underline ml-1">Learn more</a>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="options">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Options" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="options">Options</SelectItem>
                                <SelectItem value="export">Export</SelectItem>
                                <SelectItem value="import">Import</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            Add
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex space-x-4 mb-6">
                    <div className="flex-1">
                        <Input type="text" placeholder="Search service name" className="w-full" />
                    </div>
                    <Button variant="outline">
                        Filters
                        <SlidersHorizontal className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                        Manage order
                    </Button>
                </div>

                <div className="flex space-x-6">
                    <div className="w-64">
                        <h2 className="text-lg font-semibold mb-4">Categories</h2>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.name}
                                    variant="ghost"
                                    className={`w-full justify-between ${category.name === 'All categories' ? 'bg-gray-100' : ''}`}
                                >
                                    {category.name}
                                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {category.count}
                                    </span>
                                </Button>
                            ))}
                            <Button variant="link" className="text-blue-600 hover:underline">
                                Add category
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1">
                        {services.map((service, index) => (
                            <div key={index} className="mb-6">
                                {index === 0 || services[index - 1].category !== service.category ? (
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-semibold">{service.category}</h2>
                                        <Button variant="ghost" size="sm">
                                            Actions <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : null}
                                <div className="bg-white border rounded-lg p-4 flex justify-between items-start">
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
                </div>
            </div>
        </main>
    )
}