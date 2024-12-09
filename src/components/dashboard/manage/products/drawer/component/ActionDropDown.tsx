'use client'
import { DeleteProduct } from '@/api/product/delete-product'
import ConfirmDialog from '@/components/common/confirm-dialog'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    productId: number
}

const ActionDropDown = ({ productId }: Props) => {
    const { getQuery, deleteQuery } = useSetUrlParams()
    const { mutate } = DeleteProduct()
    const deleteProduct = () => {
        mutate({ id: String(productId) }, {
            onSuccess() {
                deleteQuery({ key: 'drawer' })
            }
        })
    }
    return (

        <AppDropdown trigger={(
            <span className="w-full mb-6 px-4 py-2 rounded-lg flex justify-center items-center ">
                Action
                <ChevronDown className="ml-2 h-4 w-4" />
            </span>
        )}>
            <div>
                <Link href={`/products/${productId}/edit`} className=' w-full flex justify-start px-4 py-2 '>
                    Edit product
                </Link>
                <ConfirmDialog title='Are you sure to delete?' description='It will be deleted forever' onConfirm={deleteProduct}>
                    <span className=' px-4 py-2 w-full flex justify-start text-delete '>Delete product</span>
                </ConfirmDialog>
            </div>
        </AppDropdown>

    )
}

export default ActionDropDown