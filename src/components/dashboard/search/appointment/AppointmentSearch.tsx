'use client'
import React from 'react'
import AppointmentTable from '../appointment-table'
import { useGlobalSearch } from '@/api/search/global-search'
import { AppointmentForAll } from '@/types/appointment'

type Props = {}

const AppointmentSearch = (props: Props) => {
    const { data: searchResult, isLoading } = useGlobalSearch()
    return (
        <>
            <AppointmentTable appointments={searchResult?.records as AppointmentForAll[]} isLoading={isLoading} metadata={searchResult?._metadata} />

        </>
    )
}

export default AppointmentSearch