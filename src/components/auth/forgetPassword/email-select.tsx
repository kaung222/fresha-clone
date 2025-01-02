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
                setQuery({ key: 'email', value: values.email });
                setQuery({ key: 'expire', value: String(new Date().getTime() + 300000) })

            }
        })
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot your business account password?</h2>
                        <p className="text-gray-600">Enter your email, and we&apos;ll send you a 6-digit code for verification.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
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
                            <a href="/contact" className="font-medium text-[#FF66A1] hover:underline">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>


        </>
        // <div className="flex h-screen">
        //     <div className=" w-full lg:w-1/2 p-12 flex flex-col justify-center items-center">
        //         <button onClick={() => router.back()} className="mb-6 absolute left-11 top-[100px] ">
        //             <ArrowLeft className="h-6 w-6 text-brandColor " />
        //         </button>
        //         <Card className="max-w-md p-6 ">
        //             <div className=' flex justify-center items-center mb-6 '>
        //                 <LogoWithBrand />
        //             </div>
        //             <h1 className="text-2xl font-semibold text-zinc-900 mb-4">
        //                 Forgot your business account password?
        //             </h1>
        //             <p className="text-zinc-800 text-[16px] leading-[28px] font-text mb-4">
        //                 Enter your email, and we&apos;ll send you a 6-digit code for verification.
        //             </p>
        //             <Form {...form}>
        //                 <form onSubmit={form.handleSubmit(handleRequest)} className="space-y-4">
        //                     <div>
        //                         <FormInput
        //                             form={form}
        //                             name='email'
        //                             label='Email Address'
        //                             placeholder="eg. example@gmail.com"
        //                             required
        //                         />
        //                     </div>
        //                     <Button type="submit" className="w-full bg-brandColor hover:bg-brandColor/80 text-white">
        //                         Send Code
        //                     </Button>
        //                 </form>
        //             </Form>
        //         </Card>
        //     </div>
        //     <div className=" hidden lg:block w-1/2 bg-gray-100">
        //         <Image
        //             src="/img/girl.png"
        //             alt="Woman using laptop and phone"
        //             width={500}
        //             height={400}
        //             className="w-full h-full object-cover"
        //         />
        //     </div>
        // </div>
    )
}