'use client'
import { PublicationImageUpdate } from '@/api/publication/publication-images'
import { PublicationPublicUpdate } from '@/api/publication/publication-public'
import FormInputFile from '@/components/common/FormInputFile'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Organization } from '@/types/organization'
import { ArrowLeft, Camera, Loader2, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    organization: Organization;
}

const ImagesSetup = ({ organization }: Props) => {
    const [imageArray, setImageArray] = useState<string[]>(organization.images || []);
    const { mutate, isPending } = PublicationImageUpdate();
    const { mutate: publicOrg, isSuccess } = PublicationPublicUpdate();
    const { setQuery, getQuery } = useSetUrlParams();
    const router = useRouter();
    const form = useForm();

    const removeImage = (image: string) => {
        console.log('first')
        setImageArray((pre) => pre.filter((item) => item != image))
    }
    if (isSuccess) {
        setQuery({ key: 'step', value: 'success' })
    }
    const handleContinue = (values: any) => {
        if (imageArray.length > 0) {
            mutate({ images: imageArray }, {
                onSuccess() {
                    publicOrg();

                }
            })
        } else {
            toast({ title: 'Need one photo at least' })
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8 sticky top-[85px] w-full ">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button disabled={isPending} type='submit' form="images-form">
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
            <div className=" max-w-2xl mx-auto ">
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Profile picture setup</h2>
                    <h1 className="text-3xl font-bold mt-2">Add your business photos</h1>
                    <p className="text-gray-500 mt-1">
                        Upload photos showing your place of business and services offered
                    </p>
                </div>
                <Form {...form}>
                    <form id='images-form' onSubmit={form.handleSubmit(handleContinue)}>

                        <Card>
                            <CardHeader>
                                <CardTitle>Product photo</CardTitle>
                            </CardHeader>
                            <CardContent className=" space-y-5 ">
                                <div className=" w-full aspect-[5/4] relative bg-gray-100 flex items-center justify-center">
                                    {imageArray.length > 0 ? (
                                        <div>
                                            <Image
                                                src={imageArray[0]}
                                                alt='product image'
                                                width={1000}
                                                height={800}
                                                className=' w-full aspect-[5/4] object-contain '
                                            />
                                            <div onClick={() => removeImage(imageArray[0])} className=' p-2 text-delete cursor-pointer absolute top-2 right-2  '>
                                                x
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">Add a photo</p>
                                            <Label htmlFor="product-image" className="mt-2 cursor-pointer text-blue-500">
                                                Upload
                                            </Label>
                                        </div>
                                    )}
                                </div>
                                <FormInputFile
                                    name='image'
                                    form={form}
                                    id='product-image'
                                    setImageArray={setImageArray}
                                />

                                <div className=' grid grid-cols-3 gap-2'>
                                    {imageArray.map((image, index) => index != 0 && (
                                        <div key={index} className=' relative '>
                                            <Image
                                                key={index}
                                                alt=''
                                                src={image}
                                                width={500}
                                                height={400}
                                                className=' w-[200px] aspect-[5/4] object-contain '
                                            />
                                            <div onClick={() => removeImage(image)} className=' cursor-pointer p-2 text-delete absolute top-2 right-2  '>
                                                x
                                            </div>
                                        </div>
                                    ))}
                                    {imageArray.length < 4 && (
                                        <Label htmlFor='product-image' className=' w-[200px] aspect-[5/4] flex justify-center items-center bg-gray-100 '>
                                            <Plus className=' size-6 text-blue-800 ' />
                                        </Label>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>


            </div>
        </>
    )
}

export default ImagesSetup

