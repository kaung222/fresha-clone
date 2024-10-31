import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const Page = (props: Props) => {

    redirect('/dashboard')
    return (
        <div>...</div>
    )
}

export default Page