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
import { Organization } from '@/types/organization'
import { PublicationBasicInfoUpdate } from '@/api/publication/publication-basic-info'
import { PublicationBasicFormSchema } from '@/validation-schema/publication.schema'

type Props = {
    organization: Organization;
}

export default function BusinessSetUp({ organization }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = PublicationBasicInfoUpdate()
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(PublicationBasicFormSchema),
        defaultValues: {
            name: "",
            main_phone: "",
            secondary_phone: "",
            notes: ""
        }
    });
    const { setQuery, getQuery } = useSetUrlParams();

    const handleContinue = (values: z.infer<typeof PublicationBasicFormSchema>) => {
        setIsLoading(true)
        const phones = [];
        values.main_phone && phones.push(values.main_phone);
        values.secondary_phone && phones.push(values.secondary_phone)
        const payload = {
            name: values.name,
            phones: phones,
            notes: values.notes
        }
        mutate(payload, {
            onSuccess() {
                setQuery({ key: 'step', value: 'service' })
            }
        })
        console.log(payload);
        setIsLoading(false);
    }

    useEffect(() => {
        if (organization) {
            form.reset({
                name: organization.name,
                main_phone: organization.phones && organization.phones[0] || '',
                secondary_phone: organization.phones && organization.phones[1] || '',
                notes: organization.notes
            })
        }
    }, [organization])

    return (
        <>
            <div className="flex justify-between items-center mb-8 sticky top-[85px] w-full ">
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
                    <form id='location-form' onSubmit={form.handleSubmit(handleContinue)} className=" space-y-2 ">
                        <FormInput
                            form={form}
                            name='name'
                            label='Business name'
                        />
                        <FormInput
                            form={form}
                            name='main_phone'
                            label='Phone'
                        />
                        <FormInput
                            form={form}
                            name='secondary_phone'
                            label='Secondary Phone(optional)'
                        />
                        <FormInput
                            form={form}
                            name='notes'
                            label='Notes'
                            placeholder=''
                        />
                    </form>
                </Form>

            </div>
        </>
    )
}