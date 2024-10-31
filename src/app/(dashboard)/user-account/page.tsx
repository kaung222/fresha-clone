import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    redirect('/user-account/profile')
    return (
        <div>...</div>
    )
}

export default Page