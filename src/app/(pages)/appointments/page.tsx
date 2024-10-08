'use client'
import { AppointmentList } from '@/components/pages/appointment'
import DataTablePage from '@/components/pages/appointment/DataTablePage'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            {/* <AppointmentList /> */}
            <DataTablePage />
        </div>
    )
}

export default page