'use client'
import { GetAllProducts } from '@/api/product/get-all-product'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { shortName } from '@/lib/utils'
import { Product } from '@/types/product'
import { Check, MoveLeft, PackageOpen } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { blogFakeImage } from '@/lib/data/placeholderImages'
import Link from 'next/link'
import { ExtendProduct } from './quick-sale-page'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'

type Props = {
    setShowProductSelect: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProducts: Dispatch<SetStateAction<ExtendProduct[]>>;
    selectedProducts: ExtendProduct[]
}

const SelectProductDrawer = ({ setShowProductSelect, setSelectedProducts, selectedProducts }: Props) => {
    const { data: allProduct } = GetAllProducts();
    const { data: organization } = GetOrganizationProfile();

    const handleClose = () => {
        setShowProductSelect(false)
    };

    const chooseProduct = (product: Product) => {
        setSelectedProducts((pre) => ([...pre, { ...product, quantity: 1 }]))
    }

    const isAlreadySelected = (id: string) => {
        return selectedProducts.map((product) => product.id).includes(id)
    }

    return (
        <>
            <div className=" w-full h-full absolute bg-[#040404ad] z-[60] top-0 right-0 ">
                <div className=" w-full h-full " onClick={() => handleClose()} ></div>
                <div className={` w-[350px] animate__animated animate__backInRight p-8 pt-0 bg-white h-full  shadow-dialog border border-[#E5E5E5] absolute z-10 top-0 right-0 `}>
                    <div className=' py-4 bg-white top-0 border-b h-[80px] border-gray-300 '>
                        <div className=' flex items-center justify-between '>
                            <Button variant={'ghost'} onClick={handleClose} className=' top-5 left-5 '>
                                <MoveLeft className=' w-4 h-4 ' />
                            </Button>
                            <h2 className="text-2xl font-bold">Add to cart</h2>
                        </div>
                    </div>
                    <ScrollArea className=' h-h-full-minus-80 '>
                        {allProduct?.records && allProduct?.records?.length > 0 ? (
                            allProduct?.records?.map((product) => (
                                <Button disabled={isAlreadySelected(product.id)} key={product.id} onClick={() => chooseProduct(product)} variant="ghost" className="w-full relative flex items-center gap-4 justify-start h-24 px-4 py-3">
                                    <div className={` absolute top-2 right-3 ${isAlreadySelected(product.id) ? 'block' : 'hidden'} `}>
                                        <Check className=' w-4 h-4 text-green-500 ' />
                                    </div>
                                    <div>
                                        <Image
                                            src={blogFakeImage}
                                            alt={shortName(product.name)}
                                            width={500}
                                            height={400}
                                            className=' h-16 w-16 object-cover '
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className=' font-semibold
                                         '>{product.name}</div>
                                        <div className=" font-text text-gray-500">{product.brand}</div>
                                        <div className=' font-medium text-sm '>{product.price} {organization?.currency || "MMK"}</div>
                                    </div>
                                </Button>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products to sale</h3>
                                <div className=" text-muted-foreground text-sm ">
                                    <Link href={`/products/create`} className=" font-medium text-blue-600 hover:underline "> Create </Link>
                                    <span> a new product.</span>
                                </div>
                            </div>
                        )}
                    </ScrollArea>

                </div>
            </div>
        </>
    )
}

export default SelectProductDrawer