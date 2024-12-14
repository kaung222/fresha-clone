'use client'
import { DeleteProduct } from '@/api/product/delete-product'
import ConfirmDialog from '@/components/common/confirm-dialog'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { ChevronDown, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    productId: string
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
            <Button variant="outline" className=" mb-6 px-4 py-2 flex justify-center items-center ">
                <MoreVertical className=' w-5 h-5 ' />
            </Button>
        )}>
            <div>
                <Link href={`/products/${productId}/edit`} className=' w-full text-sm flex justify-start px-4 py-2 '>
                    Edit product
                </Link>
                <ConfirmDialog title='Are you sure to delete?' description='It will be deleted forever' onConfirm={deleteProduct}>
                    <span className=' px-4 py-2 w-full flex justify-start text-sm text-delete cursor-pointer '>Delete product</span>
                </ConfirmDialog>
            </div>
        </AppDropdown>

    )
}

export default ActionDropDown