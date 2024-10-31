'use client'
import ControllableDialog from '@/components/common/control-dialog'
import FormTextarea from '@/components/common/FormTextarea'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    label: string;
    title: string;
}

const AddNotes = ({ label, title }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm();

    const handleSave = (values: any) => {
        setOpen(false);
    }
    return (
        <>
            <ControllableDialog open={open} setOpen={setOpen} title={title} trigger={(
                <span className=' w-full inline-block hover:bg-gray-100 '>
                    {label}
                </span>
            )}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)}>
                        <FormTextarea
                            form={form}
                            name='notes'
                            placeholder='Enter any special instructions or details about the appointment here'
                        />
                        <p className=" text-xs text-gray-600 ">This note will be visible only for your team members.</p>
                        <div className=" flex justify-end ">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            </ControllableDialog>
        </>
    )
}

export default AddNotes