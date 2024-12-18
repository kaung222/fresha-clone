'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import { z } from 'zod'
import FormEmailAdd from '@/components/common/FormEmailAdd'
import { toast } from '@/components/ui/use-toast'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from '@/components/ui/checkbox'
import { useSendEmail } from '@/api/mail/send-email'
import { MailSchema } from '@/validation-schema/mail.schema'
import Link from 'next/link'

type MailFormValues = z.infer<typeof MailSchema>


export function MailCreateForm() {
    const { mutate: sendMail, isPending } = useSendEmail()
    const router = useRouter()
    const [manualEmail, setManualEmail] = useState('')

    const form = useForm<MailFormValues>({
        resolver: zodResolver(MailSchema),
        defaultValues: {
            subject: '',
            recipientName: '',
            text: '',
            isToAllClient: true,
            to: [],
        },
    })

    function onSubmit(values: MailFormValues) {
        sendMail(values)
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormInput
                            form={form}
                            name='subject'
                            label='Subject'
                            placeholder='Enter email subject'
                        />
                        <FormInput
                            form={form}
                            name='recipientName'
                            label='Recipient Name'
                            placeholder='Enter recipient name'
                        />
                        <FormTextarea
                            form={form}
                            name='text'
                            label='Message'
                            placeholder='Type your message here'
                        />
                        <FormField
                            control={form.control}
                            name="isToAllClient"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Send to all clients</FormLabel>
                                        <FormDescription>
                                            Check this if you want to send the email to all clients.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="to"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Recipients</FormLabel>
                                    <FormDescription>
                                        Enter email addresses of recipients (comma-separated).
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            className='focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0'
                                            placeholder="email1@example.com, email2@example.com"
                                            onChange={(e) => {
                                                const emails = e.target.value.split(',').map(email => email.trim())
                                                form.setValue('to', emails)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-[#FF66A1] hover:bg-[#FF4D91]" disabled={isPending}>
                            {isPending ? (
                                <>Sending...</>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Email
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

