'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PackageOpen } from 'lucide-react'
import { GetAllProducts } from '@/api/product/get-all-product'
import Image from 'next/image'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import ProductDetailsDrawer from './drawer/ProductDrawer'
import Link from 'next/link'
import PageLoading from '@/components/common/page-loading'
import PaginationBar from '@/components/common/PaginationBar'

export default function ProductsTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('8')
    const [currentPage, setCurrentPage] = useState(1);
    const { setQuery, getQuery } = useSetUrlParams();
    const { data: allProduct, isLoading } = GetAllProducts();
    const drawer = getQuery('drawer');




    return (
        <>
            <div className="">
                <div className="flex justify-between gap-2 items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-sm text-gray-500 hidden md:block ">Review and manage the services your business offers.</p>
                    </div>
                    <div className="flex gap-2">
                        {/* <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Options" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <Link href={`/products/create`} className=' px-4 py-2 bg-brandColor text-white rounded-lg hover:bg-brandColor/90 '>Create</Link>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <div className="relative flex-grow max-w-[400px] min-w-[300px] ">
                        <Input
                            type="text"
                            placeholder="Search service name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-offset-0 focus:border-brandColorLight focus-visible:ring-0"
                        />
                    </div>
                    {/* <div>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div> */}
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Barcode</TableHead>
                                <TableHead>Product name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>In Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <PageLoading />
                                    </TableCell>
                                </TableRow>
                            ) : allProduct?.records && (
                                allProduct.records.length > 0 ? (

                                    allProduct?.records?.map((product) => (
                                        <TableRow key={product.id} onClick={() => setQuery({ key: 'drawer', value: String(product.id) })}>
                                            <TableCell>{product.code}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    {product.images && product.images.length > 0 ? (

                                                        <Image
                                                            src={product.images[0]}
                                                            alt='img'
                                                            width={500}
                                                            height={400}
                                                            className=' w-20 h-20 object-cover '
                                                        />
                                                    ) : (

                                                        <div className="w-20 h-20 bg-gray-200 rounded mr-2" />
                                                    )}
                                                    {product.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{product.brand}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.instock ? "available" : "sold out"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 ">
                                            <div className=' w-full '>
                                                <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                                                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products</h3>
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    <Link href={`/products/create`}>Create</Link>
                                                    <span> new product.</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
                <PaginationBar totalPages={allProduct?._metadata.pageCount || 1} />

            </div>
            {drawer && (
                <ProductDetailsDrawer />
            )}
        </>
    )
}