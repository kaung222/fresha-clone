'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import AppDialog from '@/components/common/dialog'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreateProductCategory } from '@/api/product/category/create-product-category'
import { ProductCategorySchema } from '@/validation-schema/category.schema'
import { useChangeCurrency } from '@/api/organization/change-currency.endpoint'
import FormSelect from '@/components/common/FormSelect'
import { currencyUnits } from '@/lib/data'

type Props = {
    children: React.ReactNode,
    preCurrency: string;
}

const CurrencySchema = z.object({ currency: z.string() });



export default function ChangeCurrencyDialog({ children, preCurrency }: Props) {
    const [shown, setShown] = useState(false);
    const { mutate, isPending } = useChangeCurrency();
    const form = useForm({
        resolver: zodResolver(CurrencySchema),
        defaultValues: {
            currency: preCurrency
        }
    });
    const handleSubmit = (values: z.infer<typeof CurrencySchema>) => {
        mutate(values, {
            onSuccess: () => {
                form.reset({
                    currency: ''
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
            <DialogTrigger className=' '>
                {children}
            </DialogTrigger>
            <DialogContent className=" z-[61]">
                <DialogHeader>
                    <DialogTitle className=" font-[500] text-[20px] leading-[20px] text-[#0A0A0A] ">
                        Change currency usage
                    </DialogTitle>
                    <DialogHeader className="  ">
                        <div className=" py-6 ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                    <FormSelect
                                        form={form}
                                        name='currency'
                                        label='Currency'
                                        placeholder='Choose currency used for service & product value'
                                        defaultValue={preCurrency}
                                        options={currencyUnits}
                                    />

                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit">
                                            Change
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