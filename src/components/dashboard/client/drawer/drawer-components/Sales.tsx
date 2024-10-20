'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const Sales = (props: Props) => {
    const [activeTab, setActiveTab] = useState("paid")
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Sales</h1>
            <Card>
                <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex justify-start items-center bg-transparent w-full gap-2 overflow-x-auto mb-6">
                            <TabsTrigger value="paid">Paid</TabsTrigger>
                            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                        </TabsList>
                        <TabsContent value={activeTab} className="mt-6">
                            <div className="flex flex-col items-center justify-center text-center p-12">
                                <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Sales</h3>
                                <p className="text-gray-500 max-w-sm">
                                    There are no sales records for this client yet.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}

export default Sales