'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BusinessSetUp() {
    const [businessName, setBusinessName] = useState('')
    const [website, setWebsite] = useState('')

    const handleContinue = () => {
        // Handle form submission logic here
        console.log('Continuing with:', { businessName, website })
    }

    return (
        <>
            <div>
                <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
                <h1 className="text-3xl font-bold mt-2">What's your business name?</h1>
                <p className="text-gray-500 mt-1">
                    This is the brand name your clients will see. Your billing and legal name can be added later.
                </p>
            </div>

            <div>
                <Label htmlFor="businessName">Business name</Label>
                <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-1"
                    placeholder="www.website.com"
                />
            </div>
        </>
    )
}