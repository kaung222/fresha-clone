'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductSale } from '@/types/productsale'
import { PagonationMetadata } from '@/types/_metadata';
import PageLoading from '@/components/common/page-loading';
import { Info, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import PaginationBar from '@/components/common/PaginationBar';
import DetailProductSale from './drawer/product-sale-drawer';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';


type Props = {
    productSales: ProductSale[] | undefined;
    isLoading: boolean;
    metadata: PagonationMetadata | undefined
}

const SaleTable = ({ productSales, isLoading, metadata }: Props) => {
    const { getQuery, setQuery } = useSetUrlParams()
    const detailProductSaleId = getQuery('sale-detail');

    const openDetailDrawer = (saleId: string) => {
        setQuery({ key: 'sale-detail', value: saleId })
    }

    return (
        <>
            <Table className=" border ">
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-text font-bold text-zinc-900 ">Ref #</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900 ">Client</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900 ">Amount</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900 ">Sale Date</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900 ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8}>
                                <PageLoading />
                            </TableCell>
                        </TableRow>
                    ) : productSales && (
                        productSales?.length > 0 ? (
                            productSales?.map((sale, index) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium text-blue-600">{index + 1}</TableCell>
                                    <TableCell>{sale.username}</TableCell>
                                    <TableCell>{sale.totalPrice}</TableCell>
                                    <TableCell>{format(sale.createdAt, "EEE dd MM yyyy")}</TableCell>
                                    <TableCell>
                                        <Button variant={'ghost'} onClick={() => openDetailDrawer(sale.id)}>
                                            <Info className=" w-4 h-4 " />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="text-center py-12">
                                        <PackageOpen className="mx-auto h-12 w-12 text-brandColor" />
                                        <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products sale!</h3>
                                        <div className=" text-muted-foreground text-sm ">
                                            <Link href={'/sales/products/create'} className=" font-medium text-brandColor hover:underline "> Calendar</Link>
                                            <span> a new product sale.</span>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )}

                </TableBody>
            </Table>
            <PaginationBar totalPages={metadata?.pageCount || 1} totalResult={metadata?.totalCount} />
            {
                detailProductSaleId && (
                    <DetailProductSale />
                )
            }
        </>
    )
}

export default SaleTable