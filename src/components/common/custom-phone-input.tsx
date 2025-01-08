'use client'

import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Label } from '@/components/ui/label'

interface PhoneInputProps {
    value: string
    onChange: (value: string | undefined) => void
    label?: string
}

export default function CustomPhoneInput({ value, onChange, label }: PhoneInputProps) {
    return (
        <div className="w-full max-w-sm">
            {label && <Label htmlFor="phone-input">{label}</Label>}
            <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="MM"
                value={value}
                onChange={onChange}
                className="flex mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    )
}

