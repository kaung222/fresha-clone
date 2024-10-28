'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React, { Dispatch } from 'react'
import NewAppointment from './DrawerComponents/NewAppointment'
import { NewAppointmentType } from './CalanderAppPage'

type Props = {
    makeNewAppointment: NewAppointmentType | null;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
}

const RightDrawer = ({ makeNewAppointment, setMakeNewAppointment }: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer')

    return (
        <>
            {makeNewAppointment && (
                <NewAppointment makeNewAppointment={makeNewAppointment} setMakeNewAppointment={setMakeNewAppointment} />
            )}
        </>
    )
}

export default RightDrawer