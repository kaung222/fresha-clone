import Link from 'next/link'
import React from 'react'

type Props = {
    href: string;
    children: React.ReactNode
}

const BrandLink = ({ href, children }: Props) => {
    return (
        <>
            <Link href={href} className=' px-4 py-2 bg-brandColor text-white rounded-lg hover:bg-brandColor/90 '>{children}</Link>

        </>
    )
}

export default BrandLink