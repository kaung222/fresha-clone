'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React, { Dispatch, SetStateAction } from 'react'
import NewAppointment from './DrawerComponents/NewAppointment'
import { NewAppointmentType } from './CalanderAppPage'
import { useLocalstorage } from '@/lib/helpers'
import { AppointmentEvent } from '@/types/appointment'
import DataProviderAppointmentUpdateDrawer from './DrawerComponents/DataProviderAppointmentUpdate'
import { Member } from '@/types/member'

type Props = {
    makeNewAppointment: NewAppointmentType | null;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    allMember: Member[]

}

const RightDrawer = ({ makeNewAppointment, setMakeNewAppointment, allMember }: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer');
    const appointmentId = getQuery('appointment-detail');

    return (
        <>
            {makeNewAppointment && (
                <NewAppointment allMember={allMember} makeNewAppointment={makeNewAppointment} setMakeNewAppointment={setMakeNewAppointment} />
            )}
            {appointmentId && (
                <DataProviderAppointmentUpdateDrawer appointmentId={appointmentId} />
            )
            }
        </>
    )
}

export default RightDrawer