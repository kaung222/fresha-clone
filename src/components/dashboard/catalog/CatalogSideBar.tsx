import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const CatalogSideBar = (props: Props) => {
    return (
        <>
            <aside className="w-52 min-w-[32] bg-white border-r h-full overflow-y-auto ">
                <nav className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Catalog</h2>
                    <Button variant="ghost" className="w-full justify-start bg-gray-100">
                        Service menu
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Memberships
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Products
                    </Button>
                    <h2 className="text-lg font-semibold mt-4 mb-2">Inventory</h2>
                    <Button variant="ghost" className="w-full justify-start">
                        Stocktakes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Stock orders
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Suppliers
                    </Button>
                </nav>
            </aside>
        </>
    )
}

export default CatalogSideBar