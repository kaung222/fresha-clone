"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Filter } from 'lucide-react'
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

type ServiceType = "all" | "Single Service" | "Package"
type DiscountType = "all" | "discount" | "noDiscount"

interface FilterState {
    serviceType: ServiceType
    discountType: DiscountType
}

export function ServiceFilterDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { setQuery, deleteQuery, getQuery } = useSetUrlParams();
    const serviceType = getQuery('service-type');
    const discountType = getQuery('discount-type');
    const [filters, setFilters] = React.useState<FilterState>({
        serviceType: serviceType as ServiceType || 'all',
        discountType: discountType as DiscountType || 'all',
    })

    const handleFilterChange = (key: keyof FilterState, value: ServiceType | DiscountType) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleApplyFilters = () => {
        console.log("Applied filters:", filters)
        setQuery({ key: 'service-type', value: filters.serviceType })
        setQuery({ key: 'discount-type', value: filters.discountType })
        setIsOpen(false)
    }

    const handleResetFilters = () => {
        setFilters({
            serviceType: "all",
            discountType: "all",
        })
        deleteQuery({ key: 'service-type' })
        deleteQuery({ key: 'discount-type' })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter Services</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Service Type</Label>
                        <RadioGroup
                            value={filters.serviceType}
                            onValueChange={(value) => handleFilterChange("serviceType", value as ServiceType)}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all-services" />
                                <Label htmlFor="all-services">All</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Single Service" id="services-only" />
                                <Label htmlFor="services-only">Services</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Package" id="packages-only" />
                                <Label htmlFor="packages-only">Packages</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label>Discount</Label>
                        <RadioGroup
                            value={filters.discountType}
                            onValueChange={(value) => handleFilterChange("discountType", value as DiscountType)}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all-discounts" />
                                <Label htmlFor="all-discounts">All</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="discount" id="with-discount" />
                                <Label htmlFor="with-discount">With Discount</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="noDiscount" id="no-discount" />
                                <Label htmlFor="no-discount">No Discount</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button variant="outline" onClick={handleResetFilters}>
                        Reset Filters
                    </Button>
                    <Button onClick={handleApplyFilters}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}