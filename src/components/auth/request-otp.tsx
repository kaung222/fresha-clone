'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRequestOtp } from "@/api/auth/request-otp"
import { useState } from "react"

export default function RequestOtp({ nextStep }: { nextStep: React.Dispatch<React.SetStateAction<string>> }) {
    const [email, setEmail] = useState('');
    const { mutate } = useRequestOtp();
    const requestOtp = () => {
        mutate({ email: email }, {
            onSuccess: () => {
                nextStep('2');
            }
        });
    }

    return (
        <>
            <div className=" flex justify-center items-center w-full h-screen ">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Request OTP</CardTitle>
                        <CardDescription>Enter your email address to confirm as valid Email.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div>
                                <Label className=" text-textLight mr-3" htmlFor="email">Email</Label>
                                <input className=" p-2 " value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="example@gmail.com" required />
                            </div>
                            <Button onClick={requestOtp} type="button" className="w-full">
                                Send OTP
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}