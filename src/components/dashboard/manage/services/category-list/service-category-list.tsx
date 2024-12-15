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
import { BarChartBig, Book, ChevronDown, Delete, Edit, ListIcon, Lock, Trash } from 'lucide-react'
import AddCategory from "../addCategory/add-category"
import { GetAllCategories } from "@/api/services/categories/get-all-categories"
import EditCategory from "../addCategory/edit-category"
import ConfirmDialog from "@/components/common/confirm-dialog"
import { DeleteCategory } from "@/api/services/categories/delete-category"
import { Badge } from "@/components/ui/badge"
import { colorArray } from "@/lib/data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Category } from "@/types/category"
import PageLoading from "@/components/common/page-loading"


export default function ServiceCategoryList() {
    const { data: serviceCategory, isLoading } = GetAllCategories();
    const { mutate } = DeleteCategory();
    const [categoryFilter, setCategoryFilter] = useState('all');

    const colorNameOfCode = (colorCode: string) => {
        const resultColor = colorArray.find((col) => col.value == colorCode);
        return resultColor ? resultColor.name : 'no color'
    }

    const filteredCategory = (categories: Category[], condition: string) => {
        const result = categories.filter((category) => {
            return (condition && condition != 'all') ? (condition != 'no-service' ? category.services.length > 0 : category.services.length == 0) : true
        })
        return result
    }
    return (
        <div className="w-full mx-auto ">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className=" text-xl md:text-2xl tracking-tight md:tracking-normal font-semibold mb-1">Service Categories</h1>
                    <p className="text-muted-foreground mb-1 hidden md:block">
                        Manage service category for easily select when adding new service.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter} >
                        <SelectTrigger className=" w-[80px] sm:w-[120px] " >
                            <SelectValue defaultValue={'all'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="no-service">No&nbsp;Service</SelectItem>
                                <SelectItem value="with-service">With&nbsp;Services</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <AddCategory>
                        <Button variant={'brandDefault'} className="">Create</Button>
                    </AddCategory>
                </div>
            </div>

            <div className="space-y-3">
                {isLoading ? (
                    <PageLoading />
                ) : serviceCategory && serviceCategory.length > 0 ? (
                    filteredCategory(serviceCategory, categoryFilter).length == 0 ? (
                        <h2 className="font-semibold text-zinc-900 flex gap-2 items-center ">No result</h2>
                    ) :
                        filteredCategory(serviceCategory, categoryFilter)?.map((category, index) => (
                            <Card style={{ borderColor: `${category.colorCode}` }} key={index} className="p-4 flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-zinc-900 flex gap-2 items-center ">
                                        {category.name}
                                        <Badge style={{ background: `${category.colorCode}` }} className=" text-white ">{colorNameOfCode(category.colorCode)}</Badge>
                                        <Badge variant="outline" style={{ borderColor: `${category.colorCode}`, color: `${category.colorCode}` }} className=" ">{category?.services?.length} services</Badge>
                                    </h2>
                                    <p className="text-sm text-zinc-700">{category.notes}</p>
                                </div>
                                <div className=" flex items-center gap-2 ">
                                    <EditCategory category={category}>
                                        <span className=" px-4 py-2 rounded-lg block  hover:bg-gray-100 ">
                                            <Edit className="text-blue-600 h-5 w-5" />
                                        </span>
                                    </EditCategory>
                                    {category.services.length == 0 ? (
                                        <ConfirmDialog title="Are you sure to Delete?" description="you can create next one" onConfirm={() => mutate({ id: category.id.toString() })}>
                                            <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >
                                                <Trash className="text-delete h-5 w-5" />
                                            </span>
                                        </ConfirmDialog>
                                    ) : (
                                        <ConfirmDialog button="Okay" title="Cannot delete category with services!" description="Delete services of this category first!" onConfirm={() => { }}>
                                            <span className=" px-4 py-2 rounded-lg hover:bg-gray-100 " >
                                                <Trash className="text-delete h-5 w-5" />
                                            </span>
                                        </ConfirmDialog>
                                    )}
                                </div>
                            </Card>
                        ))

                ) : (
                    <Card className=" p-3">
                        <div className="flex flex-col text-center items-center justify-center h-[300px]">
                            <BarChartBig className="h-20 w-20 text-brandColor mb-2" />
                            <p className=" text-xl font-bold">No Category </p>
                            <div className=" text-muted-foreground">
                                <AddCategory>
                                    <span className=" font-medium text-brandColor ">Create category</span>
                                </AddCategory>
                                <span> & see service category lists here.</span>
                            </div>
                        </div>
                    </Card>
                )}

            </div>
        </div>
    )
}