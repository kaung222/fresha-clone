import { redirect } from 'next/navigation'
import React from 'react'
import PageLoading from '@/components/common/page-loading'

type Props = {}

const page = (props: Props) => {
    redirect('/sales/daily-sales')
    return (
        <>
            <PageLoading />
        </>
    )
}

export default page