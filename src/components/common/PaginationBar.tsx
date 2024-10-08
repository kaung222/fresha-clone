'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'

type Props = {
    totalPages: number
}

export default function PaginationBar({ totalPages = 1 }: Props) {
    const { getQuery, setQuery } = useSetUrlParams();
    const currentPage = Number(getQuery('page')) || 1;
    const handlePageChange = (page: number) => {
        setQuery({ key: 'page', value: String(page) })
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        const ellipsis = <span className="px-2">...</span>

        pageNumbers.push(
            <Button
                key="first"
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                1
            </Button>
        )

        if (currentPage > 4) {
            pageNumbers.push(ellipsis)
        }

        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            )
        }

        if (currentPage < totalPages - 3) {
            pageNumbers.push(ellipsis)
        }

        if (totalPages > 1) {
            pageNumbers.push(
                <Button
                    key="last"
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {totalPages}
                </Button>
            )
        }

        return pageNumbers
    }


    return (
        <div className="container mx-auto p-4">


            <div className="flex items-center justify-center space-x-2 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                {renderPageNumbers()}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="text-center mt-2 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    )
}