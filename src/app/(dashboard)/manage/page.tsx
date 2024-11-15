import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    redirect('/manage/services');
    return (
        <>
            <div></div>
        </>
    )
}

export default Page