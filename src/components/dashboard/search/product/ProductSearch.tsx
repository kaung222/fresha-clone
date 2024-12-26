'use client'
import React from 'react'
import ProductTable from '../../manage/products/product-table'
import { useGlobalSearch } from '@/api/search/global-search'
import { Product } from '@/types/product'

type Props = {}

const ProductSearch = (props: Props) => {
    const { data: searchResult, isLoading } = useGlobalSearch()
    return (
        <>
            <ProductTable products={searchResult?.records as Product[]} isLoading={isLoading} metadata={searchResult?._metadata} />

        </>
    )
}

export default ProductSearch