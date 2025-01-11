'use client'
import { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export default function AddNewProduct() {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const { data: category } = GetProductCategory();
    const { data: organization } = GetOrganizationProfile()
    const { data: brands } = GetBrands()
    const { mutate, isPending } = CreateProduct();
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            price: 0,
            moq: 1,
            discountType: 'percent',
            discount: 0,
            stock: 1,
            thumbnail: undefined
        }
    })

    const removeImage = (image: string) => {
        setImageArray((pre) => pre.filter((item) => item != image))
    }

    const handleSubmit = (values: z.infer<typeof ProductSchema>) => {
        mutate({ ...values, stock: Number(values.stock), price: Number(values.price), moq: Number(values.moq), images: imageArray }, {
            onSuccess() {
                router.push('/products')
            }
        });
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues());
    const thumbnailImage = form.watch('thumbnail');


    return (
        <>
            <StepperScrollLayout
                title='Create new product'
                handlerComponent={(
                    <div className=" flex items-center gap-2 ">
                        {
                            notChanged ? (
                                <Button variant={"brandOutline"} onClick={() => router.push('/products')} className=" ">Close</Button>
                            ) : (
                                <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/products`)}>
                                    <Button variant={"brandOutline"} className=''>Close</Button>
                                </ConfirmDialog>
                            )
                        }
                        <Button disabled={isPending} type="submit" variant={"brandDefault"} form="add-product-form" className=" ">
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
                        <Card id='images' className=' p-0 border-none '>
                            <CardHeader className=' px-0'>
                                <CardTitle>Product photo</CardTitle>
                            </CardHeader>
                            <CardContent className=" space-y-5 px-0 ">
                                <div className=" w-full aspect-[5/4] relative bg-gray-100 flex items-center overflow-hidden justify-center">
                                    {thumbnailImage ? (
                                        <div className=" w-full">
                                            <Avatar className=' w-full h-full rounded-sm '>
                                                <AvatarImage src={thumbnailImage} className=' object-cover ' width={1000} height={800} />
                                                <AvatarFallback className="rounded-sm">img</AvatarFallback>
                                            </Avatar>
                                            {/* <Image
                                                src={imageArray[0]}
                                                alt='product image'
                                                width={1000}
                                                height={800}
                                                className=' w-full object-cover object-center '
                                            /> */}
                                            <Button type="button" variant={'outline'} className=' rounded-full p-2 size-8 absolute top-1 right-1 ' onClick={() => form.setValue('thumbnail', undefined)}>
                                                <X className=' w-4 h-4 text-delete ' />
                                            </Button>

                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">Add product thumbnail image</p>
                                            <Label htmlFor="product-thumbnail" className="mt-2 cursor-pointer text-blue-500">
                                                Upload
                                            </Label>
                                        </div>
                                    )}
                                </div>
                                <FormInputFileCrop
                                    name='thumbnail'
                                    form={form}
                                    aspectRatio={5 / 4}
                                    id='product-thumbnail'
                                />
                                <FormInputFileCrop
                                    name='image'
                                    form={form}
                                    aspectRatio={5 / 4}
                                    id='product-image'
                                    setImageArray={setImageArray}
                                />

                                <div className=' grid grid-cols-1 md:grid-cols-3 gap-2'>
                                    {imageArray.map((image, index) => (
                                        <div key={index} className=' relative w-full md:w-[200px] aspect-[5/4] overflow-hidden '>
                                            <Avatar className=' w-full h-full rounded-sm '>
                                                <AvatarImage src={image} className=' object-cover ' />
                                                <AvatarFallback className=" rounded-sm ">img</AvatarFallback>
                                            </Avatar>
                                            <Button type="button" variant={'outline'} className=' rounded-full p-2 size-8 absolute top-1 right-1 ' onClick={() => removeImage(image)}>
                                                <X className=' w-4 h-4 text-delete ' />
                                            </Button>

                                        </div>
                                    ))}
                                    {imageArray.length < 6 && (
                                        <Label htmlFor='product-image' className='w-full md:w-[200px] aspect-[5/4] flex justify-center items-center bg-gray-100 '>
                                            <Plus className=' size-6 text-blue-800 ' />
                                        </Label>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Card id='basic-detail' className=' p-0 border-none '>
                            <CardHeader className=" px-0">
                                <CardTitle >Basic info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-0">
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
                                <FormInput
                                    form={form}
                                    name="stock"
                                    label="Stock"
                                    type="number"
                                    defaultValue={'1'}
                                    required
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
                        <Card id='discount' className=' p-0 border-none '>
                            <CardHeader className=" px-0">
                                <CardTitle>Price & Discount</CardTitle>
                            </CardHeader>
                            <CardContent className=' px-0 '>
                                <FormInput
                                    form={form}
                                    name="price"
                                    label={`Price (${organization?.currency})`}
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
                                    label={`Discount  (%/${organization?.currency})`}
                                    placeholder="0"
                                    defaultValue={0}
                                />
                            </CardContent>
                        </Card>
                        <div className=' h-20 '></div>
                    </form>
                </Form>

            </StepperScrollLayout>
        </>
    )
}
