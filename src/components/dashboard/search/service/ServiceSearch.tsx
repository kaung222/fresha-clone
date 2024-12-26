'use client'
import { useGlobalSearch } from '@/api/search/global-search'
import CircleLoading from '@/components/layout/circle-loading'
import React from 'react'
import ServiceCard from '../../manage/services/ServiceCard'
import { Service } from '@/types/service'
import ErrorPage from '@/components/common/error-state'

type Props = {}

const ServiceSearch = (props: Props) => {
    const { data: searchResult, isLoading } = useGlobalSearch()
    return (
        <>
            {isLoading ? (
                <CircleLoading />
            ) : searchResult ? (
                searchResult.records.length == 0 ? (
                    <p className="text-center text-gray-500 mt-4">No results found. Try a different search term.</p>
                ) : (
                    <div className=' space-y-2 '>
                        {
                            searchResult.records.map((service) => (
                                <ServiceCard key={service.id} service={service as Service} />
                            ))
                        }
                    </div>
                )
            ) : (

                <ErrorPage />

            )}
        </>
    )
}

export default ServiceSearch