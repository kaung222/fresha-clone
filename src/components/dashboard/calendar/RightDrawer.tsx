'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React, { Dispatch, SetStateAction } from 'react'
import NewAppointment from './DrawerComponents/NewAppointment'
import { NewAppointmentType } from './CalanderAppPage'
import { useLocalstorage } from '@/lib/helpers'
import { AppointmentEvent } from '@/types/appointment'
import DataProviderAppointmentUpdateDrawer from './DrawerComponents/DataProviderAppointmentUpdate'
import { Member } from '@/types/member'
import CreateAppointmentDrawer from './drawers/create/CreateAppointmentDrawer'
import EditAppointmentDrawer from './drawers/edit/EditAppointmentDrawer'
import EditAppointmentDataProvider from './drawers/edit/EditAppointmentDataProvider'
import DetailAppointment from './drawers/detail/detail-appointment'

type Props = {
    makeNewAppointment: NewAppointmentType | null;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    allMember: Member[]

}

const RightDrawer = ({ makeNewAppointment, setMakeNewAppointment, allMember }: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer');
    const appointmentId = getQuery('appointment-detail');
    const detailAppointmentId = getQuery('detail')

    return (
        <>
            {makeNewAppointment && (
                <CreateAppointmentDrawer allMember={allMember} makeNewAppointment={makeNewAppointment} setMakeNewAppointment={setMakeNewAppointment} />
            )}
            {appointmentId && (
                <EditAppointmentDataProvider appointmentId={appointmentId} allMembers={allMember} />
            )
            }
            {detailAppointmentId && (
                <DetailAppointment detailAppointmentId={detailAppointmentId} allMembers={allMember} />
            )}
        </>
    )
}

export default RightDrawer