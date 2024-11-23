import { ShoppingBag } from 'lucide-react'
import React from 'react'

type Props = {}

const Order = (props: Props) => {
    return (
        <div className="flex-1 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Stock orders</h2>

                <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg border border-gray-200">
                    <div className="text-center">
                        <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-1">No order here</h3>
                        <p className="text-gray-500">Your orders will appear here.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Order