'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Send, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import LogoWithBrand from '@/components/common/LogoWithBrand'
import CommonHeader from '@/components/common/common-header'
import { useSendMailToAdmin } from '@/api/mail/send-mail-admin'

const formSchema = z.object({
    // name: z.string().min(2, {
    //     message: "Name must be at least 2 characters.",
    // }).optional(),
    email: z.string().email("Invalid email address.").optional(),
    subject: z.string().min(5, {
        message: "Subject must be at least 5 characters.",
    }),
    content: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
    isAnonymous: z.boolean().default(false),
})

type Props = {
    isInSidebar?: boolean;
}

export default function ContactSupportPage({ isInSidebar = false }: Props) {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { mutate } = useSendMailToAdmin()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // name: undefined,
            email: undefined,
            subject: "",
            content: "",
            isAnonymous: false,
        },
    })

    const isAnony = form.watch('isAnonymous')

    useEffect(() => {

        form.reset({
            // name: undefined,
            email: undefined
        })
    }, [isAnony])

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Simulate API call
        console.log(values)
        mutate({
            from: values.email || undefined,
            text: values.content,
            subject: values.subject
        }, {
            onSuccess(data, variables, context) {
                toast({
                    title: "Message sent",
                    description: "We've received your message and will get back to you soon.",
                })
                form.reset()
            },
        })
    }

    return (
        <div className="">
            <CommonHeader title='Contact Support' currentIndex={16} para='We&apos;re here to help! If you have any questions, concerns, or feedback, please don&apos;t hesitate to reach out to us using the form below.' />

            <div className={` mb-8 flex justify-between items-center ${isInSidebar ? " hidden " : " block"} `}>
                <LogoWithBrand />

                <Button
                    variant="outline"
                    className="bg-white text-[#FF66A1] border-[#FF66A1] hover:bg-[#FF66A1] hover:text-white"
                    asChild
                >
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go to Dashboard
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mt-10">
                <div>
                    {/* <h1 className="text-3xl font-bold mb-6 text-[#FF66A1]">Contact Support</h1>
                    <p className="text-gray-600 mb-6">
                        We&apos;re here to help! If you have any questions, concerns, or feedback, please don&apos;t hesitate to reach out to us using the form below.
                    </p> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onCheckedChange={(checked) => {
                                        setIsAnonymous(checked)
                                        form.setValue("isAnonymous", checked)
                                        if (checked) {
                                            // form.setValue("name", "")
                                            form.setValue("email", "")
                                        }
                                    }}
                                />
                                <label htmlFor="anonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Send Anonymously
                                </label>
                            </div>

                            {!isAnonymous && (
                                <>
                                    {/* <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Brief description of your issue" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your issue in detail"
                                                className="min-h-[150px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#FF66A1] hover:bg-[#FF4D91] text-white"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>


                </div>

                <div className=" mb-40 ">
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-[#FF66A1]" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 mr-3 text-[#FF66A1]" />
                                    <span>support@baranie.com</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-3 text-[#FF66A1]" />
                                    <span>123 Baranie Street, Beauty City, 12345</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">FAQ</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-[#FF66A1]">What are your business hours?</h3>
                                    <p className="text-sm text-gray-600">We&apos;re open Monday to Saturday, 9 AM to 7 PM.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#FF66A1]">How can I book an appointment?</h3>
                                    <p className="text-sm text-gray-600">You can book appointments through our website or mobile app.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#FF66A1]">Do you offer gift cards?</h3>
                                    <p className="text-sm text-gray-600">Yes, we offer digital gift cards that can be purchased online.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

