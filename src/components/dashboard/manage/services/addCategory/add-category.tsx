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
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export default function AddCategory({ children }: Props) {
    const [shown, setShown] = useState(false);
    const { mutate, isPending } = CreateCategory();
    const [color, setColor] = useState<string>('');
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            notes: '',
            colorCode: '#6b7280'
        }
    });

    const handleSubmit = (values: z.infer<typeof CategorySchema>) => {
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
            <DialogTrigger className=' ' asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="z-[60]  max-w-[calc(100vw-20px)] sm:max-w-[400px] ">
                <DialogHeader>
                    <DialogTitle className=" font-[600] text-[20px] leading-[20px] text-[#0A0A0A] ">
                        Add Service Category
                    </DialogTitle>
                    <DialogHeader className=" ">
                        <div className=" py-6 ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                    <FormInput
                                        form={form}
                                        name='name'
                                        label='Category Name'
                                        placeholder='eg. Hair Styling'
                                    />
                                    <FormTextarea
                                        form={form}
                                        name='notes'
                                        label='Description'
                                        placeholder="Description about category, write here..."
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
                                        <Button type="button" variant="brandOutline" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="button" variant={"brandDefault"} onClick={form.handleSubmit(handleSubmit)} className=" ">
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