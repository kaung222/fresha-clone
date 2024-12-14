'use client'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types/product'
import Link from 'next/link'
import React from 'react'

type Props = {
    singleProduct: Product;
}

const ProductDetails = ({ singleProduct }: Props) => {
    const { data: organization } = GetOrganizationProfile()
    const DataUiSet = ({ title, value, values }: { title: string, value: string, values?: string[] }) => {
        return (
            <div>
                <dt className=" font-semibold text-gray-800">{title}</dt>
                <dd className=" text-sm font-medium text-gray-600 ">{value}</dd>
                {values?.map((v, index) => (
                    <dd key={index} className=" text-sm font-medium text-gray-600 ">{v}</dd>

                ))}
            </div>
        )
    }

    return (
        <>
            <div className="">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Basic Info</h1>
                    <Link href={`/products/${singleProduct.id}/edit`} className=" border border-brandColor text-brandColor hover:bg-brandColorLight/40 px-4 py-2 rounded-md ">
                        Edit
                    </Link>
                </div>
                <Card className="mb-6">
                    <CardContent className=" p-3 md:p-10 ">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DataUiSet title="Product Name" value={singleProduct.name} />
                            <DataUiSet title="Barcode" value={singleProduct.code || '--'} />
                            <DataUiSet title="Brand" value={singleProduct.brand || '--'} />
                            <DataUiSet title="Category" value={singleProduct.category || '--'} />
                            <DataUiSet title="Original Price" value={`${singleProduct.price.toString()} ${organization?.currency}`} />
                            <DataUiSet title="Discount" value={singleProduct.discountType == "percent" ? `${singleProduct.discount}%` : `${singleProduct.discount}${organization?.currency}`} />
                            <DataUiSet title="Sale Price" value={`${singleProduct.discountPrice.toString()} ${organization?.currency}`} />
                            <DataUiSet title="Current Stock" value={`${singleProduct.stock}`} />
                            <div className=" col-span-1 sm:col-span-2 ">
                                <DataUiSet title="Description" value={singleProduct.description} />
                            </div>
                        </dl>

                    </CardContent>
                </Card>
            </div>

        </>
    )
}

export default ProductDetails