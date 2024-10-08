'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'

type Props = {}

const AppointmentResponseForm = (props: Props) => {
    const form = useForm();
    const responseBooking = (value: any) => {
        console.log(value)

    }
    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(responseBooking)} className="grid gap-4">
                <Card className="w-full max-w-md">
                    <CardContent>
                        <div className="grid gap-2">
                            <FormInput form={form} label='Preferred Time' type='time' name='time' />
                        </div>
                        <div className="grid gap-2">
                            <FormTextarea form={form} name="note" label='Additional Notes' placeholder="Enter any additional notes or requests" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Submit Booking Request
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default AppointmentResponseForm