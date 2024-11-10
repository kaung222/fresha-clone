'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { GetAllProducts } from '@/api/product/get-all-product'
import Image from 'next/image'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import ProductDetailsDrawer from './drawer/ProductDrawer'

export default function ProductsTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('8')
    const [currentPage, setCurrentPage] = useState(1);
    const { setQuery, getQuery } = useSetUrlParams();
    const { data: allProduct } = GetAllProducts();
    const drawer = getQuery('drawer');




    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-sm text-gray-500">Review and manage the services your business offers.</p>
                    </div>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Options" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>Add</Button>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder="Search service name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
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
                            {allProduct?.records?.map((product) => (
                                <TableRow key={product.id} onClick={() => setQuery({ key: 'drawer', value: String(product.id) })}>
                                    <TableCell>{product.code}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 items-center">
                                            {product.images ? (

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
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                        row(s) selected
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Rows per page</span>
                            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                                <SelectTrigger className="w-[70px]">
                                    <SelectValue>{rowsPerPage}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="16">16</SelectItem>
                                    <SelectItem value="24">24</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-sm">Page 1 of 2</div>
                        <div className="flex gap-1">
                            <Button variant="outline" size="icon">
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {drawer && (
                <ProductDetailsDrawer />
            )}
        </>
    )
}