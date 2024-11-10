'use client'
import ControllableDialog from '@/components/common/control-dialog'
import FormTextarea from '@/components/common/FormTextarea'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    label: string;
    title: string;
    note: string;
    setNote: Dispatch<SetStateAction<string>>;
}

const AddNotes = ({ label, title, note, setNote }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm();

    const handleSave = (values: any) => {
        setNote(values.notes);
        setOpen(false);
    }
    useEffect(() => {
        if (note) {
            form.reset({
                notes: note
            })
        }
    }, [form, note])
    return (
        <>
            <ControllableDialog open={open} setOpen={setOpen} title={title} trigger={(
                <span className=' w-full hover:bg-gray-100 h-10 text-sm flex justify-start px-4 py-2 rounded-lg '>
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
                            <Button type="submit">
                                {note ? "Update" : "Add"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </ControllableDialog>
        </>
    )
}

export default AddNotes