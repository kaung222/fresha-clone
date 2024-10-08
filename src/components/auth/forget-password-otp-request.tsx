'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForgetPasswordOtp } from "@/api/auth/forget-password-otp"

type Props = {
    nextStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgetPasswordOtpForm({ nextStep }: Props) {
    const [email, setEmail] = useState('');
    const { mutate } = useForgetPasswordOtp();
    const requestOtp = () => {
        mutate({ email: email }, {
            onSuccess: () => {
                nextStep('2');
            }
        });
    }

    return (
        <>
            <div className=" w-full h-screen flex justify-center items-center ">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Request OTP To confirm Your Account Email!</CardTitle>
                        <CardDescription>Enter your email address to receive a one-time password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div>
                                <Label className=" text-textLight mr-3" htmlFor="email">Email</Label>
                                <input className=" p-2 " value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
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