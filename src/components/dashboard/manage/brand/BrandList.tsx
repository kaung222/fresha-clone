'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge, Book, ChevronDown, Edit, Lock, PackageOpen, Ribbon, Trash } from 'lucide-react'
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
                    <h1 className="text-2xl font-semibold mb-1">Product Brands</h1>
                    <p className="text-muted-foreground mb-1">
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
                        <span className="bg-zinc-900 px-4 py-2 rounded-lg text-white hover:bg-zinc-800">Add</span>
                    </ProductBrandCreateDialog>
                </div>
            </div>

            <div className="space-y-3">
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
                    <div className=' w-full text-center flex flex-col justify-center items-center h-[500px]'>
                        <Ribbon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new product.</p>
                    </div>
                )}

            </div>
        </div>
    )
}