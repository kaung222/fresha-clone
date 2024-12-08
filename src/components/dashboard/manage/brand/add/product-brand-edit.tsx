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
import { z } from 'zod'
import { UpdateCategory } from '@/api/services/categories/update-category'
import { Category } from '@/types/category'
import { Brand } from '@/types/brand'
import { UpdateProductCategory } from '@/api/product/category/update-product-category'
import { UpdateBrands } from '@/api/product/brand/update-brand'
import { ProductBrandSchema } from '@/validation-schema/category.schema'

type Props = {
    children: React.ReactNode
    category: Brand
}

export default function ProductBrandEditDialog({ children, category }: Props) {
    const [shown, setShown] = useState(false);
    const { mutate, isPending } = UpdateBrands(category.id.toString());
    const form = useForm({
        resolver: zodResolver(ProductBrandSchema),
        defaultValues: {
            name: category.name,
            notes: category.notes
        }
    });
    const handleSubmit = (values: z.infer<typeof ProductBrandSchema>) => {
        console.log(values);
        const payload = { ...values, id: String(category.id) }
        mutate(payload, {
            onSuccess: () => {
                form.reset({
                    name: '',
                    notes: ''
                })
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
            <DialogTrigger className=' w-full '>
                {children}

            </DialogTrigger>
            <DialogContent className="  max-w-[calc(100vw-20px)] sm:max-w-[400px] ">
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
                                        placeholder='Tattoo & priercing'
                                    />
                                    <FormTextarea
                                        form={form}
                                        name='notes'
                                        label='Description'
                                    />

                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit">
                                            Update
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