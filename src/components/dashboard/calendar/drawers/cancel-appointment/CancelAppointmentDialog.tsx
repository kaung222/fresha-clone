"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import ControllableDialog from "@/components/common/control-dialog"
import { CancelAppointment } from "@/api/appointment/cancel-appointment"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormSelect from "@/components/common/FormSelect"
import FormTextarea from "@/components/common/FormTextarea"

type Props = {
    children: React.ReactNode;
    appointmentId: number;
}

export default function CancelAppointmentDialog({ children, appointmentId }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [tab, setTab] = React.useState<string>('default');
    const { mutate } = CancelAppointment();
    const form = useForm()

    const handleCancelAppointment = (values: any) => {
        if (tab == 'default') {
            const payload = {
                id: appointmentId.toString(),
                reason: values.reason
            }
            mutate(payload, {
                onSuccess() {
                    setIsOpen(false)
                }
            })
        } else {
            const payload = {
                id: appointmentId.toString(),
                reason: values.reasons
            }
            mutate(payload, {
                onSuccess() {
                    setIsOpen(false)
                }
            })
        }
    }


    return (
        <>
            <ControllableDialog zIndex={70} title="Are you sure you want to cancel?" open={isOpen} setOpen={setIsOpen} trigger={children}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCancelAppointment)} >
                        <div className="space-y-6 py-4">
                            <Tabs value={tab} onValueChange={setTab} className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="default">Default</TabsTrigger>
                                    <TabsTrigger value="manual">Manual</TabsTrigger>
                                </TabsList>
                                <TabsContent value="default">
                                    <div className="">
                                        <FormSelect
                                            form={form}
                                            name="reason"
                                            label="Cancellation reason"
                                            defaultValue="Conflict-booking"
                                            // placeholder='select reason on your list'
                                            options={[
                                                {
                                                    name: 'Schedule conflict',
                                                    value: 'Conflict-booking'
                                                },
                                                {
                                                    name: 'unavailable time',
                                                    value: 'At that time; team member is busy'
                                                },
                                                {
                                                    name: 'time off',
                                                    value: 'Time off'
                                                },
                                            ]}
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="manual">
                                    <div>
                                        <FormTextarea
                                            form={form}
                                            name="reasons"
                                            label="Cancelation reason "
                                            placeholder=' Tell client why you have to cancel this appointment '
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-zinc-900 text-white hover:bg-zinc-800">
                                Cancel appointment
                            </Button>
                        </div>
                    </form>
                </Form>
            </ControllableDialog>
        </>
    )
}