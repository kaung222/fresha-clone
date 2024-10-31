'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React, { Dispatch, SetStateAction } from 'react'
import NewAppointment from './DrawerComponents/NewAppointment'
import { NewAppointmentType } from './CalanderAppPage'
import { useLocalstorage } from '@/lib/helpers'
import { AppointmentEvent } from '@/types/appointment'
import DataProviderAppointmentUpdateDrawer from './DrawerComponents/DataProviderAppointmentUpdate'

type Props = {
    makeNewAppointment: NewAppointmentType | null;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;

}

const RightDrawer = ({ makeNewAppointment, setMakeNewAppointment }: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer');
    const appointmentId = getQuery('appointment-detail');

    return (
        <>
            {makeNewAppointment && (
                <NewAppointment makeNewAppointment={makeNewAppointment} setMakeNewAppointment={setMakeNewAppointment} />
            )}
            {appointmentId && (
                <DataProviderAppointmentUpdateDrawer appointmentId={appointmentId} />
            )
            }
        </>
    )
}

export default RightDrawer