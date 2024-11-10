'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types/product'
import Link from 'next/link'
import React from 'react'

type Props = {
    singleProduct: Product;
}

const ProductDetails = ({ singleProduct }: Props) => {
    return (
        <>
            <div className="">
                <h2 className="text-2xl font-bold mb-6">Product details</h2>

                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Basic Info</h3>
                            <Link href={`/catalog/products/${singleProduct.id}/edit`} className="text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 ">
                                Edit
                            </Link>
                        </div>
                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span className="text-gray-600">Product Barcode</span>
                                <span className="font-medium">{singleProduct.code}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Brand</span>
                                <span className="font-medium">{singleProduct.brand}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Product Category</span>
                                <span className="font-medium">{singleProduct.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount</span>
                                <span className="font-medium">{singleProduct.moq}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Description</span>
                                <span className="font-medium">{singleProduct.description}</span>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Stock Info</h3>
                            <Button variant="link" className="text-blue-600">
                                Edit
                            </Button>
                        </div>
                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span className="text-gray-600">InStock</span>
                                <span className="font-medium">{singleProduct.instock ? 'Available' : 'Sold Out'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Price per unit</span>
                                <span className="font-medium">{singleProduct.price}</span>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    )
}

export default ProductDetails