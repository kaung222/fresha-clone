'use client'
import { GetProductCategory } from "@/api/product/category/get-product-category"
import { Card } from "@/components/ui/card"
import { BarChartBig, Edit, Trash } from 'lucide-react'
import ProductCategoryAddDialog from "./add/product-category-add"
import { DeleteProductCategory } from "@/api/product/category/delete-product-category"
import ConfirmDialog from "@/components/common/confirm-dialog"
import ProductCategoryEditDialog from "./add/product-category-edit"
import CircleLoading from "@/components/layout/circle-loading"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function ProductCategoryList() {
    const { data: productCategory, isLoading } = GetProductCategory();
    const { mutate } = DeleteProductCategory()
    return (
        <div className="w-full ">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className=" text-xl md:text-2xl tracking-tight md:tracking-normal font-semibold mb-1">Product Categories</h1>
                    <p className="text-muted-foreground mb-1 hidden md:block">
                        Manage product category for easily select when adding new product.
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

                    <ProductCategoryAddDialog>
                        <span className="bg-brandColor px-4 py-2 rounded-lg text-white hover:bg-brandColor/90">Create</span>
                    </ProductCategoryAddDialog>
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
                        ) : productCategory && productCategory.length > 0 ? (
                            productCategory.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{category.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className=" ">{category.notes || '--'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div>
                                                <ProductCategoryEditDialog category={category}>
                                                    <span className=" px-4 py-2 rounded-lg block hover:bg-gray-100 ">
                                                        <Edit className="text-blue-600 h-5 w-5" />
                                                    </span>
                                                </ProductCategoryEditDialog>
                                            </div>
                                            <ConfirmDialog title="Are you sure to Delete?" description="you can create next one" onConfirm={() => mutate({ id: category.id.toString() })}>
                                                <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >

                                                    <Trash className="text-delete h-5 w-5" />
                                                </span>
                                            </ConfirmDialog>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col items-center text-center justify-center h-[300px]">
                                        <BarChartBig className=" mx-auto h-12 w-12 text-brandColor" />
                                        <p className=" text-xl font-bold">No Category </p>
                                        <div className=" text-muted-foreground">
                                            <ProductCategoryAddDialog>
                                                <span className=" font-medium text-brandColor ">Create category</span>
                                            </ProductCategoryAddDialog>
                                            <span> & see product category list here.</span>
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
                ) : productCategory && productCategory.length > 0 ? (
                    productCategory?.map((category, index) => (
                        <Card key={index} className="p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">{category.name}</h2>
                                <p className="text-sm text-emerald-600">{category.notes}</p>
                            </div>
                            <div className=" flex items-center gap-2 ">
                                <ProductCategoryEditDialog category={category}>
                                    <span className=" px-4 py-2 rounded-lg block hover:bg-gray-100 ">
                                        <Edit className="text-blue-600 h-5 w-5" />
                                    </span>
                                </ProductCategoryEditDialog>
                                <ConfirmDialog title="Are you sure to Delete?" description="you can create next one" onConfirm={() => mutate({ id: category.id.toString() })}>
                                    <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >

                                        <Trash className="text-delete h-5 w-5" />
                                    </span>
                                </ConfirmDialog>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card className=" p-3">
                        <div className="flex flex-col items-center text-center justify-center h-[300px]">
                            <BarChartBig className=" mx-auto h-12 w-12 text-brandColor" />
                            <p className=" text-xl font-bold">No Category </p>
                            <div className=" text-muted-foreground">
                                <ProductCategoryAddDialog>
                                    <span className=" font-medium text-brandColor ">Create category</span>
                                </ProductCategoryAddDialog>
                                <span> & see product category list here.</span>
                            </div>
                        </div>
                    </Card>
                )}

            </div> */}
        </div>
    )
}