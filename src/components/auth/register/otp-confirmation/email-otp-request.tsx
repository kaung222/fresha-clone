
'use client'
import { FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Loader2, Mail } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { ApiClient } from '@/api/ApiClient'
import { useLocalstorage } from '@/lib/helpers'
import { BrandName } from '@/lib/data'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailSchema } from '@/validation-schema/user-register.schema'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import FormInput from '@/components/common/FormInput'
import LogoWithBrand from '@/components/common/LogoWithBrand'

export default function RequestOtp() {
    const { setQuery } = useSetUrlParams();
    const { setData } = useLocalstorage();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ''
        }
    })

    const handleRequest = async (values: z.infer<typeof EmailSchema>) => {
        setIsLoading(true)
        const data = await ApiClient.get(`/auth/otp/${values.email}`).then(res => res.data);
        setData('email', values.email)
        setQuery({ key: 'step', value: "confirm" })
        setQuery({ key: 'expire', value: String(new Date().getTime() + 300000) })
        setIsLoading(false)
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Getting Start</h2>
                        <p className="text-gray-600">Enter your email address.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <Form {...form}>
                                <form className=' space-y-4 ' onSubmit={form.handleSubmit(handleRequest)} >
                                    <div>
                                        <FormInput
                                            form={form}
                                            name='email'
                                            label='Email'
                                            type='email'
                                            required
                                            placeholder='eg. example@gmail.com'
                                        />
                                    </div>
                                    <div>
                                        <Button disabled={isLoading} type="submit" className="w-full bg-brandColor text-white hover:bg-brandColor/80">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                'Get Start'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-center text-gray-500">
                                By continuing, you agree to our{' '}
                                <a href="#" className="font-medium text-[#FF66A1] hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="font-medium text-[#FF66A1] hover:underline">Privacy Policy</a>.
                            </p>
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



            {/* <div className="flex min-h-screen bg-white">
            <div className=" flex flex-col justify-center items-center my-auto px-4 py-12 sm:px-6 w-full lg:flex-row lg:w-[50%] lg:px-20 xl:px-24">
                <Card className="mx-auto w-full max-w-md p-6 ">
                    <div className=" w-full flex justify-center items-center mb-6 ">
                        <LogoWithBrand />
                    </div>
                    <div className=" text-center ">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">OTP Requerst</h2>
                        <p className=" text-sm text-gray-700">
                            Enter your email address to confirm as valid Email.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4 ">
                        <Form {...form}>
                            <form className=' space-y-4 ' onSubmit={form.handleSubmit(handleRequest)} >
                                <div>
                                    <FormInput
                                        form={form}
                                        name='email'
                                        type='email'
                                        required
                                        placeholder='eg. example@gmail.com'
                                    />
                                </div>
                                <div>
                                    <Button disabled={isLoading} type="submit" className="w-full bg-brandColor text-white hover:bg-brandColor/80">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Request OTP'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>


                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">OR</span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Are you a customer looking to book an appointment?{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Go to {BrandName} for customers
                            </a>
                        </p>
                    </div>
                </Card>
            </div>
            <div className="hidden lg:block relative w-[50%] ">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/img/girl.png"
                    alt="Woman using phone and laptop"
                    width={500}
                    height={500}
                />
            </div>
        </div> */}
        </>
    )
}





