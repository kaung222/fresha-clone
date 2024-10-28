'use client'
import AuthGuard from '@/components/providers/auth-guard'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            {/* <AuthGuard>

            </AuthGuard> */}
            {children}

        </>
    )
}

export default Layout