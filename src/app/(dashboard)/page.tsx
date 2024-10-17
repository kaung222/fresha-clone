import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    redirect(`/calendar`)
    return (
        <div>...</div>
    )
}

export default page