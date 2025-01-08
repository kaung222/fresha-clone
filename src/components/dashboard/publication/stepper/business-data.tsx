'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Loader2, X } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from '@/components/common/FormInput'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Organization } from '@/types/organization'
import { PublicationBasicInfoUpdate } from '@/api/publication/publication-basic-info'
import { PublicationBasicFormSchema } from '@/validation-schema/publication.schema'
import FormTextarea from '@/components/common/FormTextarea'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'
import Image from 'next/image'
import { toast } from '@/components/ui/use-toast'
import FormInputPhone from '@/components/common/FormInputPhone'

type Props = {
    organization: Organization;
}

export default function BusinessSetUp({ organization }: Props) {
    const { mutate, isPending } = PublicationBasicInfoUpdate()
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(PublicationBasicFormSchema),
        defaultValues: {
            thumbnail: undefined,
            name: "",
            main_phone: "",
            secondary_phone: "",
            notes: ""
        }
    });
    const { setQuery, getQuery } = useSetUrlParams();

    const handleContinue = (values: z.infer<typeof PublicationBasicFormSchema>) => {
        if (!values.thumbnail) {
            return toast({ title: "thumbnail image is required!", variant: "destructive" })
        }
        const phones = [];
        values.main_phone && phones.push(values.main_phone);
        values.secondary_phone && phones.push(values.secondary_phone)
        const payload = {
            thumbnail: values.thumbnail,
            name: values.name,
            phones: phones,
            notes: values.notes
        }
        mutate(payload, {
            onSuccess() {
                setQuery({ key: 'step', value: 'service' })
            }
        })
    }

    useEffect(() => {
        if (organization) {
            const preData: z.infer<typeof PublicationBasicFormSchema> = {
                thumbnail: organization.thumbnail || undefined,
                name: organization.name,
                main_phone: organization.phones && organization.phones[0] || '',
                secondary_phone: organization.phones && organization.phones[1] || '',
                notes: organization.notes || ''
            }
            //@ts-ignore
            form.reset(preData)
        }
    }, [organization, form])

    const thumbnailImage = form.watch('thumbnail')

    const removeImage = () => {
        form.setValue("thumbnail", undefined)
    }


    return (
        <>
            <div className="flex justify-between items-center bg-white z-50 mb-8 sticky py-1 top-[79px] w-full ">
                <Button onClick={() => router.back()} variant="brandGhost" size="icon">
                    <ArrowLeft className="h-6 w-6 text-brandColor" />
                </Button>
                <Button disabled={isPending} variant="brandDefault" type='submit' form="location-form">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </div>
            <div className=" max-w-2xl mx-auto space-y-6 ">
                <div className=' text-center px-5 flex flex-col items-center '>
                    <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
                    <h1 className="text-3xl font-bold mt-2">Business Info</h1>
                    <p className="text-gray-500 mb-1">
                        Complete your business name, thumbnail , phone ,etc ...
                    </p>
                </div>
                <Form {...form}>
                    <form id='location-form' onSubmit={form.handleSubmit(handleContinue)} className=" space-y-2 ">

                        <div className=" w-full aspect-[5/4] relative bg-gray-100 flex items-center justify-center">
                            {thumbnailImage ? (
                                <div className=" w-full ">
                                    {/* <Avatar className=' w-full rounded-sm '>
                                                <AvatarImage src={imageArray[0]} className=' w-full  object-cover ' width={1000} height={800} />
                                                <AvatarFallback className="rounded-sm">img</AvatarFallback>
                                            </Avatar> */}
                                    <Image
                                        src={thumbnailImage}
                                        width={1000}
                                        height={1000}
                                        alt=""
                                        className=" w-full block"
                                    />
                                    <Button type="button" variant={'outline'} className=' rounded-full p-2 size-8 absolute top-1 right-1 ' onClick={() => removeImage()}>
                                        <X className=' w-4 h-4 text-delete ' />
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center  ">
                                    <Camera className="mx-auto h-20 w-20 text-gray-400" />
                                    <p className="mt-2 text-xl text-gray-500">Add thumbnail image</p>
                                    <Label htmlFor="shop-thumbnail" className="mt-2 cursor-pointer text-blue-500">
                                        Upload
                                    </Label>
                                </div>
                            )}
                        </div>

                        <FormInputFileCrop
                            form={form}
                            name='thumbnail'
                            id='shop-thumbnail'
                            aspectRatio={5 / 4}
                        />

                        <FormInput
                            form={form}
                            name='name'
                            label='Business name'
                            placeholder='your business name'
                        />
                        <FormInputPhone
                            form={form}
                            name='main_phone'
                            label='Phone'
                            required
                        />
                        <FormInputPhone
                            form={form}
                            name='secondary_phone'
                            label='Secondary Phone(optional)'
                        />
                        <FormTextarea
                            form={form}
                            name='notes'
                            label='Description'
                            placeholder='More about your business, write here...'
                        />
                    </form>
                </Form>

            </div>
        </>
    )
}