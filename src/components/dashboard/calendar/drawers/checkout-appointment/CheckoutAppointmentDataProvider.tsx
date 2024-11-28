'use client'
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment'
import React from 'react'
import { Member } from '@/types/member'
import CheckoutAppointmentDrawer from './CheckoutAppointment'

type Props = {
    appointmentId: string;
    allMembers: Member[]

}

const CheckoutAppointmentDataProvider = ({ appointmentId, allMembers }: Props) => {
    const { data: singleAppointment } = GetSingleAppointment(appointmentId);

    return (
        <>
            {singleAppointment && (
                <CheckoutAppointmentDrawer appointmentId={appointmentId} singleAppointment={singleAppointment} allMembers={allMembers} />
            )}
        </>
    )
}

export default CheckoutAppointmentDataProvider