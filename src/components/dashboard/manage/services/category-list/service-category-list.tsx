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
import { Book, ChevronDown, Delete, Edit, Lock, Trash } from 'lucide-react'
import AddCategory from "../addCategory/add-category"
import { GetAllCategories } from "@/api/services/categories/get-all-categories"
import EditCategory from "../addCategory/edit-category"
import ConfirmDialog from "@/components/common/confirm-dialog"
import { DeleteCategory } from "@/api/services/categories/delete-category"


export default function ServiceCategoryList() {
    const { data: serviceCategory } = GetAllCategories();
    const { mutate } = DeleteCategory()
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-1">Service Categories</h1>
                    <p className="text-muted-foreground mb-1">
                        Manage service category for easily select when adding new service.
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

                    <AddCategory>
                        <span className="bg-zinc-900 px-4 py-2 rounded-lg text-white hover:bg-zinc-800">Add</span>
                    </AddCategory>
                </div>
            </div>

            <div className="space-y-3">
                {serviceCategory?.map((category, index) => (
                    <Card key={index} className="p-4 flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold">{category.name}</h2>
                            <p className="text-sm text-emerald-600">{category.notes}</p>
                        </div>
                        <div className=" flex items-center gap-2 ">
                            <EditCategory category={category}>
                                <span className=" px-4 py-2 rounded-lg block  hover:bg-gray-100 ">
                                    <Edit className="text-blue-600 h-5 w-5" />
                                </span>
                            </EditCategory>
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