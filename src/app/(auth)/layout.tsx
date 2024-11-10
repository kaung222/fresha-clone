'use client'
import AuthGuard from '@/components/providers/auth-guard'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <AuthGuard>
                {children}
            </AuthGuard>

        </>
    )
}

export default Layout