'use client'

import { useState } from 'react'
import { Search, Loader2, Calendar, Users, User, X, ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useDebouncedCallback } from 'use-debounce'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useGlobalSearch } from '@/api/search/global-search'
import CircleLoading from '@/components/layout/circle-loading'
import ServiceCard from '../manage/services/ServiceCard'
import { Service } from '@/types/service'
import ErrorPage from '@/components/common/error-state'
import ClientTable from '../client/client-table'
import { Client } from '@/types/client'
import AppointmentTable from './appointment-table'
import { AppointmentForAll } from '@/types/appointment'
import ProductTable from '../manage/products/product-table'
import { Product } from '@/types/product'
import SaleTable from '../sales/products/sale-table'
import { ProductSale } from '@/types/productsale'
import AppointmentSearch from './appointment/AppointmentSearch'
import ServiceSearch from './service/ServiceSearch'
import ClientSearch from './client/ClientSearch'
import ProductSearch from './product/ProductSearch'

type PropertyType = 'appointment' | 'client' | 'product' | 'service' | 'sale'

interface SearchResult {
    id: string
    title: string
    description: string
    type: PropertyType
}

export default function GlobalSearch() {
    const router = useRouter()
    const { setQuery, getQuery } = useSetUrlParams()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(getQuery('search') || '')
    const searchType = getQuery("search-type") || 'appointment';
    const search = getQuery('search');

    const inputPlaceholder = () => {
        switch (searchType) {
            case "appointment":
                return `Search by appointment Ref, client, full email, phone or notes`;
            case "service":
                return `Search by service name or description`;
            case "product":
                return "Search by product name";
            case "client":
                return "Search by client name, full email or phone";
            default:
                return "Search..."
        }
    }

    const handleSearch = useDebouncedCallback((query: string) => {
        setQuery({ key: 'search', value: searchQuery })
    }, 500);

    const setActiveTab = (type: PropertyType) => {
        setQuery({ key: 'search-type', value: type })
    }


    return (
        <div className=" fixed w-screen h-screen flex flex-col top-0 left-0  z-[52] bg-white">
            <div className=" flex py-3 px-2 md:px-5 ">
                <div className="flex items-center">
                    <Button variant="ghost" onClick={() => router.push('/')} className="mr-2" aria-label="Go back">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-semibold">Search</h1>
                </div>
            </div>
            <div className="mb-2 px-3 md:px-10">
                <div className="relative w-full">
                    {searchQuery && (
                        <X onClick={() => setSearchQuery('')} className="absolute w-3 h-3 right-14 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                    )}
                    <Input
                        type="text"
                        placeholder={inputPlaceholder()}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value)
                        }}
                        className="pr-20 focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0"
                    />
                    <Button
                        variant={'brandDefault'}
                        onClick={() => handleSearch(searchQuery)}
                        className="absolute right-0 top-0 bottom-0 rounded-l-none"

                    >

                        <Search className="h-4 w-4" />

                        <span className="sr-only">Search</span>
                    </Button>
                </div>
            </div>
            <Tabs value={searchType} onValueChange={(value) => setActiveTab(value as PropertyType)} className=' flex-grow overflow-auto w-full px-3 md:px-10 '>
                <TabsList className="grid w-full grid-cols-4 border-b  sticky top-0 z-20 ">
                    <TabsTrigger value="appointment" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Appointments
                    </TabsTrigger>
                    <TabsTrigger value="client" className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Clients
                    </TabsTrigger>
                    <TabsTrigger value="product" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Product
                    </TabsTrigger>
                    <TabsTrigger value="service" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Service
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="appointment">
                    {search ? (
                        <AppointmentSearch />
                    ) : (
                        <p className="text-center text-gray-500 mt-4">Type something to start searching.</p>
                    )}
                </TabsContent>
                <TabsContent value="client" className=' pt-10 pb-40'>
                    {search ? (
                        <ClientSearch />
                    ) : (
                        <p className="text-center text-gray-500 mt-4">Type something to start searching.</p>
                    )}
                    {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredResults.map(result => (
                            <ResultCard key={result.id} result={result} />
                        ))}
                    </div>
                    {filteredResults.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No clients found.</p>
                    )} */}
                </TabsContent>
                <TabsContent value="service" className=" pt-10 pb-40 ">
                    {search ? (
                        <ServiceSearch />
                    ) : (
                        <p className="text-center text-gray-500 mt-4">Type something to start searching.</p>
                    )}

                </TabsContent>
                <TabsContent value='product'>
                    {search ? (
                        <ProductSearch />
                    ) : (
                        <p className="text-center text-gray-500 mt-4">Type something to start searching.</p>
                    )}
                </TabsContent>
                {/* <TabsContent value='sale'>
                    <SaleTable productSales={searchResult?.records as ProductSale[]} isLoading={isLoading} metadata={searchResult?._metadata} />
                </TabsContent> */}
            </Tabs>

            {/* {searchResult?.records?.length === 0 && searchQuery && !isLoading && (
                <p className="text-center text-gray-500 mt-4">No results found. Try a different search term.</p>
            )} */}
        </div>
    )
}

