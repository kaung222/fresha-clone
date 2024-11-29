'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {
    defaultValue: string;
    options: {
        name: string;
        value: string
    }[]
}

const SortDropdown = ({ defaultValue, options }: Props) => {
    const { setQuery, getQuery } = useSetUrlParams()
    const sortBy = getQuery('sortBy') || defaultValue;

    const sortChange = (e: string) => {
        setQuery({ key: 'sortBy', value: e })
    }
    return (
        <>
            <Select value={sortBy} onValueChange={sortChange}>
                <SelectTrigger className="w-[250px] ">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>{option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}

export default SortDropdown