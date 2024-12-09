import PageLoading from '@/components/common/page-loading'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    redirect('/products/lists')
    return (
        <>
            <PageLoading />
        </>
    )
}

export default Page