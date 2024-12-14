'use client'
import ChildModal from '@/components/modal/ChildModal'
import React from 'react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import ProductDetails from '../component/product-detail'
import { Product } from '@/types/product'

type Props = {
    singleProduct: Product
}

const PhoneProductDetail = ({ singleProduct }: Props) => {
    const { deleteQuery } = useSetUrlParams();
    const handleClose = () => {
        deleteQuery({ key: 'drawer-tab' });
        deleteQuery({ key: 'drawer' });
    }
    const handleBack = () => {
        deleteQuery({ key: 'drawer-tab' })
    }
    return (
        <ChildModal onClose={handleClose} onBack={handleBack}>
            <ProductDetails singleProduct={singleProduct} />
        </ChildModal>
    )
}

export default PhoneProductDetail