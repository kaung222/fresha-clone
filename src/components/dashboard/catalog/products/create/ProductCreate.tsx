'use client'
import { useState } from 'react'
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

export default function AddNewProduct() {
    const [imageArray, setImageArray] = useState<string[]>([]);
    const { mutate } = CreateProduct();
    const form = useForm()

    const removeImage = (image: string) => {
        console.log('first')
        setImageArray((pre) => pre.filter((item) => item != image))
    }


    const handleSubmit = (values: any) => {

        console.log(values);
        mutate({ ...values, instock: values.instock == 'true' ? true : false, price: Number(values.price), moq: Number(values.moq), images: imageArray });
    }

    return (
        <div className=" flex z-[60] bg-white flex-col h-screen fixed w-screen top-0 left-0 overflow-y-auto ">
            <div className="flex justify-between items-center mb-6 h-[100px] px-10 border-b flex-shrink-0 z-[70] bg-white border-gray-300 sticky top-0 ">
                <h1 className="text-2xl font-bold">Add new product</h1>
                <div>
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button type="submit" form="add-product-form">Save</Button>
                </div>
            </div>

            <Form {...form}>
                <form id="add-product-form" onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-8 w-full px-10 max-w-[729px]  ">
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

                    {/* <Card>
                    <CardHeader>
                        <CardTitle>Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="supply-price">Supply price</Label>
                            <Input id="supply-price" placeholder="MMK 0.00" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="retail-sales">Retail sales</Label>
                            <Switch
                                id="retail-sales"
                                checked={retailSales}
                                onCheckedChange={setRetailSales}
                            />
                        </div>
                        {retailSales && (
                            <p className="text-sm text-gray-500">Allow sales of this product at checkout.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                            <Input id="sku" />
                        </div>
                        <div>
                            <Button variant="link" className="p-0">Generate SKU automatically</Button>
                        </div>
                        <div>
                            <Button variant="link" className="p-0">Add another SKU code</Button>
                        </div>
                        <div>
                            <Label htmlFor="supplier">Supplier</Label>
                            <Select>
                                <SelectTrigger id="supplier">
                                    <SelectValue placeholder="Select a Supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="track-stock-quantity">Track stock quantity</Label>
                            <Switch
                                id="track-stock-quantity"
                                checked={trackStockQuantity}
                                onCheckedChange={setTrackStockQuantity}
                            />
                        </div>
                        {trackStockQuantity && (
                            <div>
                                <Label htmlFor="current-stock-quantity">Current stock quantity</Label>
                                <Input id="current-stock-quantity" placeholder="0" />
                            </div>
                        )}
                        <div>
                            <h4 className="font-medium mb-2">Low stock and reordering</h4>
                            <p className="text-sm text-gray-500 mb-2">
                                Fresha will automatically notify you and pre-fill the reorder quantity set for future stock orders.{' '}
                                <a href="#" className="text-blue-500">Learn more</a>
                            </p>
                            <div className="flex gap-4 mb-2">
                                <div className="w-1/2">
                                    <Label htmlFor="low-stock-level">Low stock level</Label>
                                    <Input id="low-stock-level" placeholder="0" />
                                    <p className="text-xs text-gray-500 mt-1">The level to get notified to reorder</p>
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="reorder-quantity">Reorder quantity</Label>
                                    <Input id="reorder-quantity" placeholder="0" />
                                    <p className="text-xs text-gray-500 mt-1">The default amount to order</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="low-stock-notifications">Low stock notifications</Label>
                                <Switch
                                    id="low-stock-notifications"
                                    checked={lowStockNotifications}
                                    onCheckedChange={setLowStockNotifications}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
                </form>
            </Form>
        </div>
    )
}