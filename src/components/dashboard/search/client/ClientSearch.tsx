'use client'
import React from 'react'
import ClientTable from '../../client/client-table'
import { useGlobalSearch } from '@/api/search/global-search'
import { Client } from '@/types/client'

type Props = {}

const ClientSearch = (props: Props) => {
    const { data: searchResult, isLoading } = useGlobalSearch()
    return (
        <>
            <ClientTable isLoading={isLoading} clients={searchResult?.records as Client[]} metadata={searchResult?._metadata} isSearch={true} />
        </>
    )
}

export default ClientSearch