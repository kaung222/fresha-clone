'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import AppDialog from '@/components/common/dialog'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreateCategory } from '@/api/services/categories/create-categories'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategorySchema } from '@/validation-schema/category.schema'
import { z } from 'zod'
import { Select } from '@/components/ui/select'
import FormColorSelect from '@/components/common/FormColorSelect'
import { colorArray } from '@/lib/data'

type Props = {
    children: React.ReactNode
}

export default function AddCategory({ children }: Props) {
    const [shown, setShown] = useState(false);
    const { mutate, isPending } = CreateCategory();
    const [color, setColor] = useState<string>('');
    const form = useForm({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            notes: '',
            colorCode: ''
        }
    });

    const handleSubmit = (values: z.infer<typeof CategorySchema>) => {
        console.log(values);
        mutate(values, {
            onSuccess: () => {
                setShown(false);
            }
        })
    }

    const handleClose = () => {
        setShown(false)
    }

    return (

        <Dialog open={shown} onOpenChange={setShown} >
            <DialogClose />
            <DialogTrigger className=' '>
                {children}
            </DialogTrigger>
            <DialogContent className=" ">
                <DialogHeader>
                    <DialogTitle className=" font-[500] text-[20px] leading-[20px] text-[#0A0A0A] ">
                        Add Category
                    </DialogTitle>
                    <DialogHeader className=" z-[100] ">
                        <div className=" py-6 ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                    <FormInput
                                        form={form}
                                        name='name'
                                        label='Category Name'
                                        placeholder='Hair Styling'
                                    />
                                    <FormTextarea
                                        form={form}
                                        name='notes'
                                        label='Description'
                                        placeholder="More about this category"
                                    />
                                    <FormColorSelect
                                        form={form}
                                        name='colorCode'
                                        label='Category color'
                                        options={colorArray}
                                        defaultValue="#6b7280"
                                        placeholder="choose color"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit">
                                            Add
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </DialogHeader>
                </DialogHeader>
            </DialogContent>
        </Dialog>



    )
}