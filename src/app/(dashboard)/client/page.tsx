'use client'
import ClientList from '@/components/dashboard/client/ClientList'
import ClientDrawer from '@/components/dashboard/client/drawer/ClientDrawer'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { setQuery, getQuery } = useSetUrlParams();
    const drawer = getQuery('drawer')
    return (
        <>
            <ClientList />
            {drawer && (
                <ClientDrawer />
            )}
        </>
    )
}

export default Page