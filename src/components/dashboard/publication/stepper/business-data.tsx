'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from '@/components/common/FormInput'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useLocalstorage } from '@/lib/helpers'
import { BusinessNameSchema } from '@/validation-schema/businessname.schema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

export default function BusinessSetUp() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        // resolver: zodResolver(BusinessNameSchema),
        defaultValues: {
            name: "",
            address: "",
        }
    });
    const { setQuery, getQuery } = useSetUrlParams();
    const { getData, setData } = useLocalstorage();
    const localName = getData('name');
    const localAddress = getData('address');

    useEffect(() => {
        if (localName) {
            form.reset({
                name: localName,
                address: localAddress
            })
        }
    }, [localName, localAddress])

    const handleContinue = async (values: any) => {
        // Handle form submission logic here
        // setIsLoading(true)
        console.log(values);

        // await setData('name', values.name);
        // await setData('address', values.address);
        await setQuery({ key: 'step', value: 'service' });
        // setIsLoading(false)

    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button disabled={isLoading} type='submit' form="location-form">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </div>
            <div className=" max-w-2xl mx-auto ">


                <div>
                    <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
                    <h1 className="text-3xl font-bold mt-2">Business Name</h1>
                    <p className="text-gray-500 mt-1">
                        Check your business name. This is the brand name your clients will see.
                    </p>
                </div>

                <Form {...form}>
                    <form id='location-form' onSubmit={form.handleSubmit(handleContinue)}>
                        <FormInput
                            form={form}
                            name='name'
                            label='Business name'
                        />
                        <FormInput
                            form={form}
                            name='phone'
                            label='Add Phone'
                        />
                        <FormInput
                            form={form}
                            name='address'
                            label='Address (City)'
                            placeholder=''
                        />
                    </form>
                </Form>

            </div>
        </>
    )
}