'use client'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { ForgetPassword } from '@/api/auth/forget-password'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailSchema } from '@/validation-schema/user-register.schema'
import { Form } from '@/components/ui/form'
import { useRouter } from "next/navigation";
import { z } from 'zod'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import FormInput from '@/components/common/FormInput'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import { ArrowLeft } from "lucide-react"

export default function EmailSelectForPassword() {
    const { setQuery } = useSetUrlParams()
    const { mutate } = ForgetPassword()
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ''
        }
    })

    const handleRequest = (values: z.infer<typeof EmailSchema>) => {
        // Handle password reset logic here
        mutate({ email: values.email }, {
            onSuccess() {
                setQuery({ key: 'step', value: 'otp-confirm' });
                setQuery({ key: 'email', value: values.email })
            }
        })
    }

    return (
        <div className="flex h-screen">
            <div className=" w-full lg:w-1/2 p-12 flex flex-col justify-center items-center">
                <button onClick={() => router.back()} className="mb-6 absolute left-11 top-[100px] ">
                    <ArrowLeft className="h-6 w-6 text-brandColor " />
                </button>
                <Card className="max-w-md p-6 ">
                    <div className=' flex justify-center items-center mb-6 '>
                        <LogoWithBrand />
                    </div>
                    <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
                        Forgot your business account password?
                    </h1>
                    <p className="text-zinc-800 text-[16px] leading-[28px] font-text mb-4">
                        Enter your email, and we&apos;ll send you a 6-digit code for verification.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRequest)} className="space-y-4">
                            <div>
                                <FormInput
                                    form={form}
                                    name='email'
                                    label='Email Address'
                                    placeholder="eg. example@gmail.com"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-brandColor hover:bg-brandColor/80 text-white">
                                Send Code
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
            <div className=" hidden lg:block w-1/2 bg-gray-100">
                <Image
                    src="/img/girl.png"
                    alt="Woman using laptop and phone"
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}