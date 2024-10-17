import AppDropdown from '@/components/common/DropDown'
import ServiceCategoryBar from '@/components/dashboard/catalog/services/ServiceLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (

        <>
            <ServiceCategoryBar>
                {children}
            </ServiceCategoryBar>
        </>
    )
}

export default Layout