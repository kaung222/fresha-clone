'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PackageOpen, Edit, Trash, Info } from 'lucide-react'
import { GetAllProducts } from '@/api/product/get-all-product'
import Image from 'next/image'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import ProductDetailsDrawer from './drawer/ProductDrawer'
import Link from 'next/link'
import PageLoading from '@/components/common/page-loading'
import PaginationBar from '@/components/common/PaginationBar'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { Badge } from '@/components/ui/badge'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { DeleteProduct } from '@/api/product/delete-product'
import BrandLink from '@/components/common/brand-link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'


export default function ProductsTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('8')
    const [currentPage, setCurrentPage] = useState(1);
    const { setQuery, getQuery } = useSetUrlParams();
    const { data: allProduct, isLoading } = GetAllProducts();
    const { mutate: deleteProduct } = DeleteProduct()
    const drawer = getQuery('drawer');
    const { data: organization } = GetOrganizationProfile()




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
                        <BrandLink href='/products/create'>Create</BrandLink>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <div className="relative flex-grow max-w-[400px] min-w-[300px] ">
                        <Input
                            type="text"
                            placeholder="Search service name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0"
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
                            ) : allProduct?.records && (
                                allProduct.records.length > 0 ? (

                                    allProduct?.records?.map((product) => (
                                        <TableRow key={product.id} >
                                            <TableCell className=" text-center">{product.code || (
                                                <div className=" w-full text-center ">--</div>
                                            )}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    {product.images && product.images.length > 0 ? (
                                                        <Avatar className=' w-[100px] h-20 rounded-sm '>
                                                            <AvatarImage src={product.images && product.images.length > 0 ? product.images[0] : '/img/fake.jpg'} className=' object-cover rounded-sm ' />
                                                            <AvatarFallback className=" rounded-sm">{shortName(product.name)}</AvatarFallback>
                                                        </Avatar>
                                                        // <Image
                                                        //     src={product.images && product.images.length > 0 ? product.images[0] : '/img/fake.jpg'}
                                                        //     alt='img'
                                                        //     width={500}
                                                        //     height={400}
                                                        //     className=' w-20 h-20 object-cover bg-gray-200 '
                                                        // />
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
                                                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products</h3>
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    <Link href={`/products/create`} className=" text-brandColor font-medium ">Create</Link>
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
                <PaginationBar totalPages={allProduct?._metadata.pageCount || 1} totalResult={allProduct?._metadata.totalCount} />

            </div>
            {drawer && (
                <ProductDetailsDrawer />
            )}
        </>
    )
}