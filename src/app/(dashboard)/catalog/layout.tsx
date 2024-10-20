import CatalogSideBar from '@/components/dashboard/catalog/CatalogSideBar'
import ServiceCategoryBar from '@/components/dashboard/catalog/services/ServiceLayout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <>
            <ServiceCategoryBar>
                {children}
            </ServiceCategoryBar>
        </>
    )
}

export default layout