'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EmailSelectForPassword() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle password reset logic here
        console.log('Password reset requested for:', email)
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-12 flex flex-col justify-center items-center">
                <div className="max-w-md">
                    <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
                        Forgot your business account password?
                    </h1>
                    <p className="text-zinc-800 text-[16px] leading-[28px] font-text mb-4">
                        Enter your email, and we&apos;ll send you a 6-digit code for verification.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="sr-only">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-black text-white">
                            Send Code
                        </Button>
                    </form>
                </div>
            </div>
            <div className="w-1/2 bg-gray-100">
                <img
                    src="/img/girl.png"
                    alt="Woman using laptop and phone"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}