'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React, { Dispatch, SetStateAction } from 'react'
import { NewAppointmentType } from './CalanderAppPage'
import { Member, MemberForAll } from '@/types/member'
import CreateAppointmentDrawer from './drawers/create/CreateAppointmentDrawer'
import EditAppointmentDataProvider from './drawers/edit/EditAppointmentDataProvider'
import DetailAppointment from './drawers/detail/detail-appointment'
import CheckoutAppointmentDataProvider from './drawers/checkout-appointment/CheckoutAppointmentDataProvider'

type Props = {
    makeNewAppointment: NewAppointmentType | null;
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    allMember: MemberForAll[]

}

const RightDrawer = ({ makeNewAppointment, setMakeNewAppointment, allMember }: Props) => {

    const { getQuery, setQuery } = useSetUrlParams();
    const newAppointment = getQuery('drawer');
    const appointmentId = getQuery('appointment-detail');
    const detailAppointmentId = getQuery('detail');
    const checkoutAppointmentId = getQuery('checkout');

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
            {checkoutAppointmentId && (
                <CheckoutAppointmentDataProvider appointmentId={checkoutAppointmentId} allMembers={allMember} />
            )}
        </>
    )
}

export default RightDrawer