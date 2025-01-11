'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge, Book, ChevronDown, Edit, Highlighter, Lock, PackageOpen, Ribbon, Trash, Trash2 } from 'lucide-react'
import ProductBrandCreateDialog from "./add/product-brand-create"
import { GetBrands } from "@/api/product/brand/get-brands"
import ProductBrandEditDialog from "./add/product-brand-edit"
import ConfirmDialog from "@/components/common/confirm-dialog"
import { DeleteBrand } from "@/api/product/brand/delete-brand"
import CircleLoading from "@/components/layout/circle-loading"

export default function BrandList() {
    const { data: brands, isLoading } = GetBrands();
    const { mutate } = DeleteBrand()

    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-xl md:text-2xl tracking-tight md:tracking-normal font-semibold mb-1">Product Brands</h1>
                    <p className="text-muted-foreground mb-1 hidden md:block ">
                        Manage product brands for easily choose when adding product.
                    </p>
                </div>
                <div className="flex gap-2">
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Options <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit sources</DropdownMenuItem>
                            <DropdownMenuItem>View analytics</DropdownMenuItem>
                            <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <ProductBrandCreateDialog>
                        <span className="bg-brandColor px-4 py-2 rounded-lg text-white hover:bg-brandColor/90">Create</span>
                    </ProductBrandCreateDialog>
                </div>
            </div>

            <div className="rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Brand Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <CircleLoading />
                                </TableCell>
                            </TableRow>
                        ) : brands && brands.length > 0 ? (
                            brands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{brand.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className=" ">{brand.notes || '--'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div>
                                                <ProductBrandEditDialog category={brand}>
                                                    <span className=" px-4 py-2 rounded-lg block hover:bg-gray-100 ">
                                                        <Edit className="text-blue-600 h-4 w-4" />
                                                    </span>
                                                </ProductBrandEditDialog>
                                            </div>
                                            <ConfirmDialog title="Are you sure to Delete?" description="you can create next one" onConfirm={() => mutate({ id: brand.id.toString() })}>
                                                <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >

                                                    <Trash2 className="text-delete h-4 w-4" />
                                                </span>
                                            </ConfirmDialog>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col text-center items-center justify-center h-[300px]">
                                        <Highlighter className="h-20 w-20 text-brandColor mb-2" />
                                        <p className=" text-xl font-bold">No Brand </p>
                                        <div className=" text-muted-foreground">
                                            <ProductBrandCreateDialog>
                                                <span className=" font-medium text-brandColor ">Create brand</span>
                                            </ProductBrandCreateDialog>
                                            <span> & see product brand list here.</span>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* <div className="space-y-3">
                {isLoading ? (
                    <CircleLoading />
                ) : brands && brands.length > 0 ? (
                    brands?.map((brand, index) => (
                        <Card key={index} className="p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">{brand.name}</h2>
                                <p className="text-sm text-emerald-600">{brand.notes}</p>
                            </div>
                            <div className=" flex items-center gap-2 ">
                                <ProductBrandEditDialog category={brand}>
                                    <span className=" px-4 py-2 rounded-lg block hover:bg-gray-100 ">
                                        <Edit className="text-blue-600 h-5 w-5" />
                                    </span>
                                </ProductBrandEditDialog>
                                <ConfirmDialog title="Are you sure to Delete?" description="you can create next one" onConfirm={() => mutate({ id: brand.id.toString() })}>
                                    <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >

                                        <Trash className="text-delete h-5 w-5" />
                                    </span>
                                </ConfirmDialog>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card className=" p-3">
                        <div className="flex flex-col text-center items-center justify-center h-[300px]">
                            <Highlighter className="h-20 w-20 text-brandColor mb-2" />
                            <p className=" text-xl font-bold">No Brand </p>
                            <div className=" text-muted-foreground">
                                <ProductBrandCreateDialog>
                                    <span className=" font-medium text-brandColor ">Create brand</span>
                                </ProductBrandCreateDialog>
                                <span> & see product brand list here.</span>
                            </div>
                        </div>
                    </Card>
                )}

            </div> */}
        </div>
    )
}