'use client'
import { GetAllClients } from '@/api/client/get-all-clients'
import { GetAllProducts } from '@/api/product/get-all-product'
import ChildModal from '@/components/modal/ChildModal'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { Product } from '@/types/product'
import { Check, MoveLeft } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { ExtendProduct } from './quick-sale'
import Image from 'next/image'
import { blogFakeImage } from '@/lib/data/placeholderImages'

type Props = {
    setShowProductSelect: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProducts: Dispatch<SetStateAction<ExtendProduct[]>>;
    selectedProducts: ExtendProduct[]
}

const SelectProductDrawer = ({ setShowProductSelect, setSelectedProducts, selectedProducts }: Props) => {
    const { data: allProduct } = GetAllProducts()

    const handleClose = () => {
        setShowProductSelect(false)
    };

    const chooseClient = (product: Product) => {
        setSelectedProducts((pre) => ([...pre, { ...product, quantity: 1 }]))
        setShowProductSelect(false)
    }

    const isAlreadySelected = (id: number) => {
        return selectedProducts.map((product) => product.id).includes(id)
    }

    return (
        <>
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
                    {allProduct?.records?.map((product) => (
                        <Button disabled={isAlreadySelected(product.id)} key={product.id} onClick={() => chooseClient(product)} variant="ghost" className="w-full relative flex items-center gap-4 justify-start h-24 px-4 py-3">
                            <div className={` absolute top-2 right-3 ${isAlreadySelected(product.id) ? 'block' : 'hidden'} `}>
                                <Check className=' w-4 h-4 text-green-500 ' />
                            </div>
                            <div>
                                <Image
                                    src={product.images[0] || blogFakeImage}
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
                                <div className=' font-medium text-sm '>{product.price} MMK</div>
                            </div>
                        </Button>
                    ))}
                </ScrollArea>

            </div>
        </>
    )
}

export default SelectProductDrawer