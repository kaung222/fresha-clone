'use client'
import { GetProductCategory } from "@/api/product/category/get-product-category"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, ChevronDown, Edit, Lock, Trash } from 'lucide-react'
import ProductCategoryAddDialog from "./add/product-category-add"
import { DeleteProductCategory } from "@/api/product/category/delete-product-category"
import ConfirmDialog from "@/components/common/confirm-dialog"
import ProductCategoryEditDialog from "./add/product-category-edit"


export default function ProductCategoryList() {
    const { data: productCategory } = GetProductCategory();
    const { mutate } = DeleteProductCategory()
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-1">Product Categories</h1>
                    <p className="text-muted-foreground mb-1">
                        Manage product category for easily select when adding new product.
                    </p>
                </div>
                <div className="flex gap-2">
                    <DropdownMenu>
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
                    </DropdownMenu>

                    <ProductCategoryAddDialog>
                        <span className="bg-zinc-900 px-4 py-2 rounded-lg text-white hover:bg-zinc-800">Add</span>
                    </ProductCategoryAddDialog>
                </div>
            </div>

            <div className="space-y-3">
                {productCategory?.map((category, index) => (
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
                ))}
            </div>
        </div>
    )
}