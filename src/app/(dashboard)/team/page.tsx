import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Team = (props: Props) => {
    redirect('/team/teammember')
    return (
        <div>Team</div>
    )
}

export default Team