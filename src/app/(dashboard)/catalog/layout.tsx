import ServiceCategoryBar from '@/components/dashboard/catalog/services/ServiceMainPage'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
}

export default layout