'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from '../ui/input'
import IconEye from '../icons/IconEye'
import { useCreateNewPassword } from '@/api/auth/create-new-password'
import { useLocalstorage } from '@/lib/helpers'
import { redirect } from 'next/navigation'
import IconEyeHide from '../icons/IconEyeHide'

type Props = {
    nextStep: React.Dispatch<React.SetStateAction<string>>;
}

const SetNewPassword = ({ nextStep }: Props) => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { getData } = useLocalstorage();
    const { mutate } = useCreateNewPassword();
    const forgetEmail = getData('forgetEmail');
    const handleSetNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword == confirmPassword && forgetEmail) {
            const payload = {
                email: forgetEmail,
                newPassword: confirmPassword,
            }
            mutate(payload, {
                onSuccess: () => {
                    redirect('/login');
                }
            });
        } else {
            alert('Confirm Password does not match!')
        }
    }

    return (
        <>
            <div className=' flex justify-center items-center w-full h-screen'>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Set New Password</CardTitle>
                        <CardDescription>Create a new secure password for your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSetNewPassword}>
                            <div className="relative">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute bottom-1 right-1 h-7 w-7"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <IconEye className="h-4 w-4" />
                                    ) : (
                                        <IconEyeHide className=' w-4 h-4 ' />

                                    )}
                                    <span className="sr-only">Toggle password visibility</span>
                                </Button>
                            </div>
                            <div className="relative">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute bottom-1 right-1 h-7 w-7"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <IconEye className="h-4 w-4" />
                                    ) : (
                                        <IconEyeHide className=' w-4 h-4 ' />

                                    )}
                                    <span className="sr-only">Toggle password visibility</span>
                                </Button>
                            </div>
                            <Button type="submit" className="w-full">
                                Set Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default SetNewPassword