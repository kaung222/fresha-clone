'use client'
import { useEffect, useMemo, useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '@/validation-schema/product.schema'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetSingleProduct } from '@/api/product/get-single-product'
import { UpdateProduct } from '@/api/product/update-product'
import { useParams, useRouter } from 'next/navigation'
import FormSelect from '@/components/common/FormSelect'
import { GetProductCategory } from '@/api/product/category/get-product-category'
import { GetBrands } from '@/api/product/brand/get-brands'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'

export default function ProductEditPage() {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const { getQuery } = useSetUrlParams();
    const { data: organization } = GetOrganizationProfile()
    const { productId } = useParams();
    const { data: previousProduct, isLoading } = GetSingleProduct(String(productId))
    const { data: category } = GetProductCategory()
    const { data: brands } = GetBrands()
    const { mutate, isPending } = UpdateProduct(String(productId));
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            code: '',
            price: 0,
            brand: '',
            description: '',
            category: '',
            moq: 1,
            discountType: 'percent',
            discount: 0,
            stock: 1,
        }
    })

    useEffect(() => {
        if (previousProduct) {
            form.reset({
                name: previousProduct.name,
                code: previousProduct.code || undefined,
                price: previousProduct.price,
                brand: previousProduct.brand || undefined,
                description: previousProduct.description || undefined,
                category: previousProduct.category || undefined,
                stock: previousProduct.stock,
                moq: previousProduct.moq,
                discountType: previousProduct.discountType,
                discount: previousProduct.discount
            });
            setImageArray(previousProduct.images || []);
        }
    }, [previousProduct, form])

    const removeImage = (image: string) => {
        console.log('first');
        setImageArray((pre) => pre.filter((item) => item != image))
    }

    const handleUpdate = (values: any) => {

        console.log(values);
        mutate({ ...values, stock: Number(values.stock), price: Number(values.price), moq: Number(values.moq), images: imageArray });
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())


    return (
        <>
            <StepperScrollLayout
                title='Edit product'
                handlerComponent={(
                    <div className=" flex gap-2 items-center ">
                        {
                            notChanged ? (
                                <Button variant={'brandOutline'} onClick={() => router.push('/products')} className=" ">Close</Button>
                            ) : (
                                <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/products`)}>
                                    <Button variant={"brandOutline"} className=' '>Close</Button>
                                </ConfirmDialog>
                            )
                        }
                        <Button disabled={isPending} type="submit" variant={"brandDefault"} form="edit-product-form" className=" ">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    updating...
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'images', name: 'Images' }, { id: 'basic-detail', name: "Basic Info" }, { id: 'discount', name: 'Price & Discount' }]}
                threshold={0.3}
                editData={previousProduct}
            >
                <Form {...form}>
                    <form id="edit-product-form" onSubmit={form.handleSubmit(handleUpdate)} className=" space-y-10 ">

                        {previousProduct && (
                            <>
                                <Card id='images' className="p-0 border-none">
                                    <CardHeader className=" px-0 ">
                                        <CardTitle>Product photo</CardTitle>
                                    </CardHeader>
                                    <CardContent className=" space-y-5 px-0 ">
                                        <div className=" w-full aspect-[5/4] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                                            {imageArray?.length > 0 ? (
                                                <div>
                                                    <Image
                                                        src={imageArray[0]}
                                                        alt='product image'
                                                        width={1000}
                                                        height={800}
                                                        className=' w-full  object-cover object-center '
                                                    />
                                                    <Button variant={'outline'} className=' rounded-full p-2 size-8 absolute top-1 right-1 ' onClick={() => removeImage(imageArray[0])}>
                                                        <X className=' w-4 h-4 text-delete ' />
                                                    </Button>

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

                                        <div className=' grid grid-cols-1 md:grid-cols-3 gap-2'>
                                            {imageArray?.map((image, index) => index != 0 && (
                                                <div key={index} className=' relative w-full md:w-[200px] aspect-[5/4] overflow-hidden '>
                                                    <Image
                                                        key={index}
                                                        alt=''
                                                        src={image}
                                                        width={500}
                                                        height={400}
                                                        className=' w-full object-cover object-center '
                                                    />
                                                    <Button variant={'outline'} className=' rounded-full p-2 size-8 absolute top-1 right-1 ' onClick={() => removeImage(image)}>
                                                        <X className=' w-4 h-4 text-delete ' />
                                                    </Button>
                                                </div>
                                            ))}
                                            {imageArray?.length < 4 && (
                                                <Label htmlFor='product-image' className=' w-full md:w-[200px] aspect-[5/4] flex justify-center items-center bg-gray-100 '>
                                                    <Plus className=' size-6 text-blue-800 ' />
                                                </Label>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card id='basic-detail' className=" p-0 border-none">
                                    <CardHeader className=' px-0 '>
                                        <CardTitle>Basic info</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 px-0">
                                        <FormInput
                                            form={form}
                                            name='name'
                                            label='Product Name'
                                        />
                                        <FormInput
                                            form={form}
                                            name='code'
                                            label='Barcode (optional)'
                                            placeholder='eg. 8211070042'
                                        />
                                        {brands && previousProduct && (
                                            <FormSelect
                                                form={form}
                                                name='brand'
                                                label='Product brand'
                                                placeholder='select brand'
                                                defaultValue={previousProduct.brand || undefined}
                                                options={brands.map((brand) => ({ name: brand.name, value: brand.name }))}
                                            />
                                        )}
                                        {category && previousProduct && (
                                            <FormSelect
                                                form={form}
                                                name='category'
                                                label='Category'
                                                defaultValue={previousProduct.category || undefined}
                                                placeholder='Select category'
                                                options={category.map(cat => ({ name: cat.name, value: cat.name }))}
                                            />
                                        )}
                                        <FormInput
                                            form={form}
                                            name="stock"
                                            label="Stock"
                                            type="number"
                                            required
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
                                <Card id='discount' className=' p-0 border-none'>
                                    <CardHeader className=' px-0 '>
                                        <CardTitle>Price & Discount</CardTitle>
                                    </CardHeader>
                                    <CardContent className=' px-0'>
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
                                <div className=" h-20"></div>
                            </>
                        )}
                    </form>
                </Form>
            </StepperScrollLayout>
        </>

    )
}
