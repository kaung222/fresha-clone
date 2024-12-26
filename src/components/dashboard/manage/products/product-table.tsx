'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from '@/types/product'
import PageLoading from '@/components/common/page-loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { shortName } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile';
import Link from 'next/link';
import { Edit, Info, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import PaginationBar from '@/components/common/PaginationBar';
import { PagonationMetadata } from '@/types/_metadata';
import ProductDetailsDrawer from './drawer/ProductDrawer';


type Props = {
    products: Product[] | undefined;
    isLoading: boolean;
    metadata: PagonationMetadata | undefined;
    isSearch?: boolean;

}

const ProductTable = ({ products, isLoading, metadata, isSearch = false }: Props) => {
    const { data: organization } = GetOrganizationProfile();
    const { setQuery, getQuery } = useSetUrlParams();
    const drawer = getQuery('drawer');

    return (
        <>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" text-center ">Barcode</TableHead>
                            <TableHead className=" text-center min-w-[150px] ">Product name</TableHead>
                            <TableHead className=" text-center ">Category</TableHead>
                            <TableHead className=" text-center ">Brand</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className=" min-w-[130px] text-center ">Price</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <PageLoading />
                                </TableCell>
                            </TableRow>
                        ) : products && (
                            products?.length > 0 ? (

                                products?.map((product) => (
                                    <TableRow key={product.id} >
                                        <TableCell className=" text-center">{product.code || (
                                            <div className=" w-full text-center ">--</div>
                                        )}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 items-center">
                                                {product.thumbnail ? (
                                                    <Avatar className=' w-[100px] h-20 rounded-sm '>
                                                        <AvatarImage src={product.thumbnail} className=' object-cover rounded-sm ' />
                                                        <AvatarFallback className=" rounded-sm">{shortName(product.name)}</AvatarFallback>
                                                    </Avatar>
                                                ) : (
                                                    <div className="w-[100px] h-20 bg-gray-200 rounded mr-2" />
                                                )}
                                                {product.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className=" text-center">{product.category || (
                                            <div className=" w-full text-center ">--</div>
                                        )}</TableCell>
                                        <TableCell className=" text-center">{product.brand || (
                                            <div className=" w-full text-center ">--</div>
                                        )}</TableCell>
                                        <TableCell className=' text-center '>{product.stock}</TableCell>
                                        <TableCell className=' w-[150px] text-center '>
                                            {product.discount > 0 ? (
                                                <span className=" flex flex-col ">
                                                    <span className=" items-center space-x-2">
                                                        <span className="text-sm text-gray-700 font-medium line-through">
                                                            {product.price} {organization?.currency}
                                                        </span>
                                                        <Badge variant="secondary" className="text-green-600 bg-green-100">
                                                            {product.discountType === 'percent'
                                                                ? `${product.discount}% off`
                                                                : `${product.discount} ${organization?.currency} off`}
                                                        </Badge>
                                                    </span>
                                                    <span className="font-semibold  text-green-600">
                                                        {product.discountPrice.toFixed(0)} {organization?.currency}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="font-semibold  ">
                                                    {product.price} <span className="text-sm">{organization?.currency}</span>
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end space-x-2">
                                                <Link href={`/products/${product.id}/edit`} className=' flex justify-center items-center h-6 w-6 hover:bg-gray-100 rounded-lg '>
                                                    <Edit className="h-4 w-4 text-blue-600 inline-block " />
                                                </Link>

                                                {/* <ConfirmDialog onConfirm={() => deleteProduct({ id: product.id })} title='Delete Product?' description='you can create it later again.'>
                                                        <Button variant="ghost" size="icon" className=" w-6 h-6 p-1 " >
                                                            <Trash className="h-4 w-4 text-delete " />
                                                        </Button>
                                                    </ConfirmDialog> */}
                                                <Button variant={'ghost'} onClick={() => setQuery({ key: 'drawer', value: String(product.id) })} className=' w-6 h-6 p-1 '>
                                                    <Info className=' w-4 h-4 ' />
                                                </Button>

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-12 ">
                                        <div className=' w-full '>
                                            <PackageOpen className="mx-auto h-12 w-12 text-brandColor" />
                                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">{isSearch ? "No search result for product" : "No products"}</h3>
                                            {!isSearch && (
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    <Link href={`/products/create`} className=" text-brandColor font-medium ">Create</Link>
                                                    <span> new product.</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
            <PaginationBar totalPages={metadata?.pageCount || 1} totalResult={metadata?.totalCount} />

            {drawer && (
                <ProductDetailsDrawer />
            )}
        </>
    )
}

export default ProductTable