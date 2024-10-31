'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const router = useRouter();
    router.push('/dashboard')
    return (
        <div>...</div>
    )
}

export default page