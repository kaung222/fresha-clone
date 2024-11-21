'use client'
import { useCreateQuickPayment } from '@/api/payment/create-quick-payment'
import ControllableDialog from '@/components/common/control-dialog'
import FormInput from '@/components/common/FormInput'
import FormRadio from '@/components/common/FormRadio'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const QuickPayDialog = (props: Props) => {
    const [open, setOpen] = useState(false);
    const { mutate } = useCreateQuickPayment();
    const form = useForm({
        defaultValues: {
            method: 'Cash',
            clientName: '',
            amount: ''
        }
    })

    const handleCreatePayment = (values: any) => {
        console.log(values);
        const payload = values.clientName ? {
            method: values.method,
            clientName: values.clientName,
            amount: Number(values.amount)
        } : {
            method: values.method,
            amount: Number(values.amount)
        }
        mutate(payload, {
            onSuccess() {
                setOpen(false);
            }
        })
    }



    return (
        <>
            <ControllableDialog title='Quick Pay' open={open} setOpen={setOpen} trigger={(
                <span className=' px-4 py-2 rounded-lg hover:bg-gray-800 text-white bg-black  '>Quick Pay</span>
            )}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreatePayment)}>
                        <FormRadio
                            form={form}
                            name='method'
                            label='Pay method'
                            options={[{ label: 'Kpay', value: "K pay", id: "KBZ pay" }, { label: 'Cash', value: 'Cash', id: "cash" }]}
                        />
                        <FormInput
                            form={form}
                            name='clientName'
                            label='Client(optional)'
                            placeholder='name'
                        />
                        <FormInput
                            form={form}
                            name='amount'
                            label='Total Amount'
                            type='number'
                        />
                        <div className=' px-4 py-2 flex justify-end items-center gap-2 '>
                            <Button onClick={() => setOpen(false)} type='button' variant={'outline'}>
                                Cancel
                            </Button>
                            <Button type='submit'>
                                Save
                            </Button>

                        </div>
                    </form>
                </Form>
            </ControllableDialog>
        </>
    )
}

export default QuickPayDialog