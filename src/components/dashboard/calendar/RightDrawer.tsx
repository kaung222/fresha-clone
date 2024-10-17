'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'
import NewAppointment from './DrawerComponents/NewAppointment'

type Props = {}

const RightDrawer = (props: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer')

    return (
        <>
            {newAppointment == 'new-appointment' && (
                <NewAppointment />
            )}
        </>
    )
}

export default RightDrawer