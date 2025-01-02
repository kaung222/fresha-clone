'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { ResetPassword } from '@/api/auth/reset-password'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPasswordSchema } from '@/validation-schema/new-password.schema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import { Card } from '@/components/ui/card'

export default function PasswordReset() {
    const { mutate } = ResetPassword()
    const { getQuery, setQuery } = useSetUrlParams();
    const router = useRouter()
    const email = getQuery('email')
    const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        if (values.password !== values.confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        // Handle password reset logic here
        if (email) {
            mutate({
                email: email,
                password: values.password
            }, {
                onSuccess() {
                    setQuery({ key: 'step', value: 'success' })
                }
            })
        }
    }

    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Set a new password</h2>
                        <p className="text-gray-600">Create a new password that differs from your previous ones for security.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                    <div>
                                        <FormInput
                                            form={form}
                                            name='password'
                                            label='Password'
                                            type='password'
                                        />
                                    </div>

                                    <div>
                                        <FormInput
                                            form={form}
                                            name='confirmPassword'
                                            label='Confirm Password'
                                            type='password'
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-brandColor text-white hover:bg-brandColor/80">
                                        Reset Password
                                    </Button>
                                </form>
                            </Form>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            {/* <p className="text-xs text-center text-gray-500">
                                By continuing, you agree to our{' '}
                                <a href="#" className="font-medium text-[#FF66A1] hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="font-medium text-[#FF66A1] hover:underline">Privacy Policy</a>.
                            </p> */}
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Need help?{' '}
                            <a href="#" className="font-medium text-[#FF66A1] hover:underline">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>


            {/* 

            <div className=" min-h-screen w-full flex justify-center items-center relative ">
                <button onClick={() => router.back()} className="mb-6 absolute left-11 top-[100px] ">
                    <ArrowLeft className="h-6 w-6 text-brandColor " />
                </button>
                <Card className="max-w-md p-6 ">
                    <div className=" w-full flex justify-center items-center mb-6 ">
                        <LogoWithBrand />
                    </div>
                    <h1 className="text-2xl font-bold  text-center ">Set a new password</h1>
                    <p className="text-gray-500 mb-6 text-sm ">
                        Create a new password that differs from your previous ones for security.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div>
                                <FormInput
                                    form={form}
                                    name='password'
                                    label='Password'
                                    type='password'
                                />
                            </div>

                            <div>
                                <FormInput
                                    form={form}
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                />
                            </div>

                            <Button type="submit" className="w-full bg-brandColor text-white hover:bg-brandColor/80">
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div> */}
        </>
    )
}