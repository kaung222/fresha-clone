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
import ConfirmDialog from '../common/confirm-dialog'
import { useRouter } from 'next/navigation'
import { Card } from '../ui/card'
import LogoWithBrand from '../common/LogoWithBrand'

export default function LoginPage() {
    const { mutate, isPending } = useLogin();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const handleLogin = (values: z.infer<typeof LoginSchema>) => {
        mutate(values, {
            onSuccess() {
                router.push('/calendar');
            }
        });
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
                        <p className="text-gray-600">Login account & manage your business.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div className="">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleLogin)} className=" space-y-5 ">
                                        <FormInput
                                            form={form}
                                            name='email'
                                            type='email'
                                            placeholder='Email'
                                            label="Email"
                                        />
                                        <FormInput
                                            form={form}
                                            name='password'
                                            label="Password"
                                            type='password'
                                            placeholder='Password'
                                        />
                                        <div className="flex items-center justify-end">
                                            <div className="text-sm">
                                                <a href="/forgot-password" className="font-medium text-brandColor hover:underline">
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <Button type="submit" disabled={isPending} className="w-full bg-brandColor text-white hover:bg-brandColor/8">
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

                                    </form>
                                </Form>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className=" text-center text-sm text-gray-600 ">
                                Don&apos;t have an account? Confirm email &
                                <Link href="/email-confirm" className="font-medium text-brandColor hover:underline ">
                                    &nbsp;Sign up
                                </Link>
                                .
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

        </>
    )
}