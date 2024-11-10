'use client'
import ChildModal from '@/components/modal/ChildModal'
import React from 'react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import Review from '../drawer-components/Review'
import Appointment from '../drawer-components/Appointment'

type Props = {}

const PhoneAppointment = (props: Props) => {
    const { deleteQuery } = useSetUrlParams();
    const handleClose = () => {
        deleteQuery({ key: 'drawer-tab' });
        deleteQuery({ key: 'drawer' });
    }
    const handleBack = () => {
        deleteQuery({ key: 'drawer-tab' })
    }
    return (
        <ChildModal onClose={handleClose} onBack={handleBack}>
            <Appointment />
        </ChildModal>
    )
}

export default PhoneAppointment