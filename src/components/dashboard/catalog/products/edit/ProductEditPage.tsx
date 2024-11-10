'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Cross, Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import FormRadio from '@/components/common/FormRadio'
import { CreateProduct } from '@/api/product/create-product'
import FormInputFile from '@/components/common/FormInputFile'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '@/validation-schema/product.schema'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetSingleProduct } from '@/api/product/get-single-product'
import { UpdateProduct } from '@/api/product/update-product'
import { useParams } from 'next/navigation'

export default function ProductEditPage() {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const { getQuery } = useSetUrlParams();
    const { productId } = useParams();
    const { data: previousProduct, isLoading } = GetSingleProduct(String(productId))
    const { mutate } = UpdateProduct(String(productId));
    const form = useForm({
        // resolver: zodResolver(ProductSchema),
        defaultValues: {
            images: [''],
            name: '',
            code: '',
            price: 0,
            brand: '',
            description: '',
            category: '',
            instock: '',
            moq: 1
        }
    })

    useEffect(() => {
        if (previousProduct) {
            form.reset({
                name: previousProduct.name,
                code: previousProduct.code || '',
                price: previousProduct.price,
                brand: previousProduct.brand || '',
                description: previousProduct.description,
                category: previousProduct.category || '',
                instock: String(previousProduct.instock),
                moq: previousProduct.moq
            });
            setImageArray(previousProduct.images || []);
        }
    }, [previousProduct, form])

    const removeImage = (image: string) => {
        console.log('first')
        setImageArray((pre) => pre.filter((item) => item != image))
    }


    const handleUpdate = (values: any) => {

        console.log(values);
        mutate({ ...values, instock: values.instock == 'true' ? true : false, price: Number(values.price), moq: Number(values.moq), images: imageArray });
    }

    return (
        <div className=" flex z-[60] bg-white flex-col h-screen fixed w-screen top-0 left-0 overflow-y-auto ">
            <div className="flex justify-between items-center mb-6 h-[100px] px-10 border-b flex-shrink-0 z-[70] bg-white border-gray-300 sticky top-0 ">
                <h1 className="text-2xl font-bold">Edit product</h1>
                <div>
                    <Button type="button" variant="outline" className="mr-2">Cancel</Button>
                    <Button type="submit" form="edit-product-form">Save</Button>
                </div>
            </div>
            <Form {...form}>
                <form id="edit-product-form" onSubmit={form.handleSubmit(handleUpdate)} className=" space-y-8 w-full px-10 max-w-[729px]  ">

                    {previousProduct && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product photo</CardTitle>
                                </CardHeader>
                                <CardContent className=" space-y-5 ">
                                    <div className=" w-full aspect-[5/4] relative bg-gray-100 flex items-center justify-center">
                                        {imageArray?.length > 0 ? (
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
                                        name='images'
                                        form={form}
                                        id='product-image'
                                        setImageArray={setImageArray}
                                    />

                                    <div className=' grid grid-cols-3 gap-2'>
                                        {imageArray?.map((image, index) => index != 0 && (
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
                                        {imageArray?.length < 4 && (
                                            <Label htmlFor='product-image' className=' w-[200px] aspect-[5/4] flex justify-center items-center bg-gray-100 '>
                                                <Plus className=' size-6 text-blue-800 ' />
                                            </Label>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormInput
                                        form={form}
                                        name='name'
                                        label='Product Name'
                                    />
                                    <FormInput
                                        form={form}
                                        name='code'
                                        label='Barcode (optional)'
                                        placeholder='UPC'
                                    />
                                    <FormInput
                                        form={form}
                                        name='brand'
                                        label='Product brand'
                                        placeholder='brand'
                                    />
                                    <FormInput
                                        form={form}
                                        name='category'
                                        label='Category'
                                        placeholder='category'
                                    />
                                    <FormInput
                                        form={form}
                                        name="price"
                                        label='Price'
                                    />
                                    <FormRadio
                                        form={form}
                                        name='instock'
                                        label='In Stock'
                                        options={[{ label: 'in stock', value: 'true', id: 'instock' }, { label: 'sold out', value: 'false', id: 'soldout' }]}
                                    />
                                    <FormInput
                                        form={form}
                                        name='moq'
                                        label='Moq'
                                    />
                                    <FormTextarea
                                        form={form}
                                        name='description'
                                        label='Description'
                                    />
                                </CardContent>
                            </Card>
                        </>
                    )}
                </form>
            </Form>
        </div>
    )
}