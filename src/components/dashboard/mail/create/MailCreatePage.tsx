'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mailSchema } from '@/validation-schema/mail.schema'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import { z } from 'zod'
import FormEmailAdd from '@/components/common/FormEmailAdd'

export function MailCreateForm() {
    const router = useRouter()
    const [manualEmail, setManualEmail] = useState('')
    const form = useForm({
        resolver: zodResolver(mailSchema),
        defaultValues: {
            to: [],
            text: '',
            subject: '',
            recipientName: ''
        }
    })

    const handleSendMail = (values: z.infer<typeof mailSchema>) => {
        console.log('Sending mail:', values)
        // Here you would typically send the data to your backend
    }

    return (
        <Card className=" fixed top-0 left-0 w-screen h-screen z-[51] border-none ">
            <CardHeader className='  p-0 border-b '>
                <CardTitle className="text-2xl font-bold text-center w-full h-[80px] px-3 md:px-10 flex justify-between items-center">
                    <Button variant={'brandGhost'} onClick={() => router.push('/mail')} >
                        <ArrowLeft className=' w-6 h-6 ' />
                    </Button>
                    <div>Send Mail</div>
                    <div></div>
                </CardTitle>
            </CardHeader>
            <div className=' p-3 md:p-10 pb-0 md:pb-0 overflow-auto h-h-full-minus-80 '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSendMail)}>
                        <CardContent className="space-y-4">
                            <FormEmailAdd
                                form={form}
                                name='to'
                                placeholder='Add email address'
                                label='Recipients'
                            />
                            <div className="space-y-2">
                                <FormInput
                                    form={form}
                                    name='recipientName'
                                    placeholder='Enter recipient name'
                                    label='Recipient Name'
                                />
                            </div>
                            <div className="space-y-2">
                                <FormInput
                                    form={form}
                                    name='subject'
                                    label='Subject'
                                    placeholder='Enter email subject'
                                />
                            </div>
                            <div className="space-y-2">
                                <FormTextarea
                                    form={form}
                                    name='text'
                                    label='Message'
                                    placeholder='Enter your message'
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full bg-[#FF66A1] hover:bg-[#FF4D91]">
                                Send Mail
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

