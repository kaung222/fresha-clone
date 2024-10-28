'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronDown, Filter, List, Plus, Search } from "lucide-react"

export default function ProductList() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="text-sm text-gray-500">Review and manage the services your business offers.</p>
                </div>
                <div className="flex space-x-2">
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search service name"
                        className="pl-10 pr-4 py-2 w-full"
                    />
                </div>
                <Button variant="outline" className="mr-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
                <Button variant="outline">
                    <List className="h-4 w-4 mr-2" />
                    Manage order
                </Button>
            </div>

            <div className="border rounded-lg p-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13H21V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 3L19 13H5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No product yet</h2>
                    <p className="text-blue-600 hover:underline cursor-pointer">
                        Click here to make a new product.
                    </p>
                </div>
            </div>
        </div>
    )
}