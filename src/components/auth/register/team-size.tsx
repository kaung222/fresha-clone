'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Info } from 'lucide-react'

const teamSizes = [
    { id: 'solo', label: "It's just me" },
    { id: 'small', label: '2-5 people' },
    { id: 'medium', label: '6-10 people' },
    { id: 'large', label: '11+ people' },
]

export default function TeamSizeSelection() {
    const [selectedSize, setSelectedSize] = useState<string | undefined>()

    const handleContinue = () => {
        console.log('Selected team size:', selectedSize)
        // Handle form submission logic here
    }

    return (
        <>
            <div>
                <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
                <h1 className="text-3xl font-bold mt-2">What's your team size?</h1>
                <p className="text-gray-500 mt-1">
                    This will help us set up your calendar correctly. Don't worry, this doesn't change
                    the price - you can have unlimited team members for free on Fresha!
                </p>
            </div>

            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {teamSizes.map((size) => (
                    <Card key={size.id} className="mb-3">
                        <CardContent className="flex items-center p-4">
                            <RadioGroupItem value={size.id} id={size.id} className="mr-4" />
                            <Label htmlFor={size.id}>{size.label}</Label>
                        </CardContent>
                    </Card>
                ))}
            </RadioGroup>

            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="flex items-start p-4">
                    <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                        We'll add "Wendy" as an example employee so you can see how the
                        system works. You can manage employees later once you're in!
                    </p>
                </CardContent>
            </Card>
        </>
    )
}