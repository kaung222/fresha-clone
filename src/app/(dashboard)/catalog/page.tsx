import ServicePage from '@/components/dashboard/catalog/services/ServicePage'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    redirect('/catalog/services');
    return (
        <>
            <div></div>
        </>
    )
}

export default Page