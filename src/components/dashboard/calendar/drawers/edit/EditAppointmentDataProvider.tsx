'use client'
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment'
import React from 'react'
import EditAppointmentDrawer from './EditAppointmentDrawer'
import { Member } from '@/types/member'

type Props = {
    appointmentId: string;
    allMembers: Member[]

}

const EditAppointmentDataProvider = ({ appointmentId, allMembers }: Props) => {
    const { data: singleAppointment } = GetSingleAppointment(appointmentId);

    return (
        <>
            {singleAppointment && (
                <EditAppointmentDrawer appointmentId={appointmentId} singleAppointment={singleAppointment} allMembers={allMembers} />
            )}
        </>
    )
}

export default EditAppointmentDataProvider