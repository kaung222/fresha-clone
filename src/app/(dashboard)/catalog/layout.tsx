import CatalogSideBar from '@/components/dashboard/catalog/CatalogSideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="flex h-full bg-gray-100 w-full">
            <CatalogSideBar />
            <div className=' w-full overflow-x-auto '>


                {children}
            </div>
        </div>
    )
}

export default layout