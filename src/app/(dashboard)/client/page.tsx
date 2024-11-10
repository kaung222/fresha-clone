import ClientList from '@/components/dashboard/client/ClientList'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {

    return (
        <>
            <ClientList />

        </>
    )
}

export default Page