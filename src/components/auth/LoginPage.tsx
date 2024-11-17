'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Loader2, Mail } from 'lucide-react'
import Image from 'next/image'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import FormInput from '../common/FormInput'
import { useLogin } from '@/api/auth/login'
import { getCookie } from '@/lib/utils'
import { GetTokenByRefresh } from '@/api/auth/refresh-token'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/validation-schema/login.schema'
import { z } from 'zod'
import { BrandName } from '@/lib/data'

export default function LoginPage() {
    const { mutate, isPending } = useLogin();
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const handleLogin = (values: z.infer<typeof LoginSchema>) => {
        mutate(values);
    }

    return (
        <div className="flex min-h-screen bg-white">
            <div className=" flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-row lg:w-[50%] lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{BrandName} for business</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Create an account or log in to manage your business.
                        </p>
                    </div>
                    <div className="mt-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                                <FormInput
                                    form={form}
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                />
                                <FormInput
                                    form={form}
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                />
                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <Button type="submit" disabled={isPending} className="w-full bg-black text-white hover:bg-gray-800">
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                </div>
                                <p className="mt-8 text-center text-sm text-gray-600 ">
                                    Don&apos;t have an account
                                    <Link href="/email-confirm" className="font-medium text-blue-600 hover:text-blue-500 mx-2 ">
                                        confirm email
                                    </Link>
                                    &
                                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 ml-2">
                                        register
                                    </Link>
                                    .
                                </p>
                            </form>
                        </Form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Are you a customer looking to book an appointment?{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Go to {BrandName} for customers
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