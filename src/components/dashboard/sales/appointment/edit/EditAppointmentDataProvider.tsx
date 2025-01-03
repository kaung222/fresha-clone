'use client'
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment'
import CircleLoading from '@/components/layout/circle-loading'
import { useParams } from 'next/navigation'
import React from 'react'
import EditAppointmentPage from './EditAppointmentPage'
import { GetTeamMember } from '@/api/member/get-teammember'


const EditAppointmentDataProvider = () => {
    const { appointmentId } = useParams();
    const { data: allMembers } = GetTeamMember()
    const { data: singleAppointment, isLoading } = GetSingleAppointment(appointmentId.toString());
    return (
        <>
            {isLoading ? (
                <CircleLoading />
            ) : (
                singleAppointment && allMembers && (
                    <EditAppointmentPage allMembers={allMembers} appointmentId={appointmentId.toString()} singleAppointment={singleAppointment} />
                )
            )}
        </>
    )
}

export default EditAppointmentDataProvider