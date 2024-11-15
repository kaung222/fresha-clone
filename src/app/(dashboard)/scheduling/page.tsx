import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Team = (props: Props) => {
    redirect('/scheduling/scheduling/scheduled-shifts')
    return (
        <div>Team</div>
    )
}

export default Team