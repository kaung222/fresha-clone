
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

export default function RequestOtp() {
    const [email, setEmail] = useState('')
    const { setQuery } = useSetUrlParams();
    const { setData } = useLocalstorage();
    const [isLoading, setIsLoading] = useState(false);

    const handleRequest = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        if (!email) throw new Error('Please enter email')
        const data = await ApiClient.get(`/auth/otp/${email}`).then(res => res.data);
        console.log(data);
        setData('email', email)
        setQuery({ key: 'step', value: "confirm" })
        setIsLoading(false)

    }

    return (
        <div className="flex min-h-screen bg-white">
            <div className=" flex flex-col justify-center items-center my-auto px-4 py-12 sm:px-6 w-full lg:flex-row lg:w-[50%] lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-md ">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Fresha for professionals</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your email address to confirm as valid Email.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4 ">
                        <form className=' space-y-4 ' onSubmit={handleRequest} >

                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button disabled={isLoading} type="submit" className="w-full bg-black text-white hover:bg-gray-800">
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
                                Go to Fresha for customers
                            </a>
                        </p>
                    </div>
                </div>
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
        </div>
    )
}





