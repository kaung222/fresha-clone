'use client'
import { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Cross, Loader2, Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import FormRadio from '@/components/common/FormRadio'
import { CreateProduct } from '@/api/product/create-product'
import FormInputFile from '@/components/common/FormInputFile'
import Image from 'next/image'
import { GetProductCategory } from '@/api/product/category/get-product-category'
import { GetBrands } from '@/api/product/brand/get-brands'
import FormSelect from '@/components/common/FormSelect'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '@/validation-schema/product.schema'
import { z } from 'zod'
import ConfirmDialog from '@/components/common/confirm-dialog'

export default function AddNewProduct() {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const { data: category } = GetProductCategory();
    const { data: brands } = GetBrands()
    const { mutate, isPending } = CreateProduct();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            price: 0,
            moq: 1,
            instock: 'true',
            discountType: 'percent',
            discount: 0
        }
    })

    const removeImage = (image: string) => {
        console.log('first')
        setImageArray((pre) => pre.filter((item) => item != image))
    }

    const handleSubmit = (values: z.infer<typeof ProductSchema>) => {

        console.log(values);
        mutate({ ...values, instock: values.instock == 'true', price: Number(values.price), moq: Number(values.moq), images: imageArray }, {
            onSuccess() {
                router.push('/manage/products')
            }
        });
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())


    return (
        <>
            <StepperScrollLayout
                title='Create new product'
                handlerComponent={(
                    <div className=" flex items-center gap-2 ">
                        {
                            notChanged ? (
                                <Link href="/manage/products" className=" px-4 py-2 rounded-lg ">Close</Link>
                            ) : (
                                <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/manage/products`)}>
                                    <span className=' cursor-pointer  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                                </ConfirmDialog>
                            )
                        }
                        <Button disabled={isPending} type="submit" form="add-product-form">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'images', name: 'Images' }, { id: 'basic-detail', name: 'Basic Information' }, { id: 'discount', name: "Price & Discount" }]}
                threshold={0.2}
            >

                <Form {...form}>
                    <form id="add-product-form" onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-10   ">
                        <Card id='images'>
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
                        <Card id='basic-detail'>
                            <CardHeader>
                                <CardTitle >Basic info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormInput
                                    form={form}
                                    name='name'
                                    label='Product Name'
                                    placeholder='eg. Fresh Energy'
                                    required
                                />
                                <FormInput
                                    form={form}
                                    name='code'
                                    label='Barcode (optional)'
                                    placeholder='eg. 899198070029'
                                />
                                {brands && (
                                    <FormSelect
                                        form={form}
                                        name='brand'
                                        label='Product brand'
                                        placeholder='eg. NIVEA'
                                        options={brands.map((brand) => ({ name: brand.name, value: brand.name }))}
                                    />
                                )}
                                {category && (
                                    <FormSelect
                                        form={form}
                                        name='category'
                                        label='Category'
                                        placeholder='eg. Roll On'
                                        options={category.map(cat => ({ name: cat.name, value: cat.name }))}
                                    />
                                )}
                                <FormRadio
                                    form={form}
                                    name='instock'
                                    label='In Stock'
                                    defaultValue='true'
                                    options={[{ label: 'in stock', value: 'true', id: 'instock' }, { label: 'sold out', value: 'false', id: 'soldout' }]}
                                />
                                <FormInput
                                    form={form}
                                    name='moq'
                                    label='Min Of Quantity for purchase'
                                    type='number'
                                    defaultValue={'1'}
                                    required
                                />
                                <FormTextarea
                                    form={form}
                                    name='description'
                                    label='Description'
                                    placeholder='Describe more about the product here...'
                                />
                            </CardContent>
                        </Card>
                        <Card id='discount'>
                            <CardHeader>
                                <CardTitle>Price & Discount</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormInput
                                    form={form}
                                    name="price"
                                    label='Price'
                                    type='number'
                                    placeholder='Product Price'
                                    required
                                />
                                <FormSelect
                                    name='discountType'
                                    form={form}
                                    label='Discount type'
                                    defaultValue='percent'
                                    options={[{ name: 'Percentage', value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                                />

                                <FormInput
                                    form={form}
                                    name='discount'
                                    type='number'
                                    label='Discount  (%/units)'
                                    placeholder="0"
                                    defaultValue={0}
                                />
                            </CardContent>
                        </Card>
                    </form>
                </Form>

            </StepperScrollLayout>
        </>
    )
}
