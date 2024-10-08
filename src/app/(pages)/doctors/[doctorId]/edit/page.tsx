import DoctorDetailDataProvider from '@/components/pages/doctor/DoctorDetailDataProvider'
import EditDoctor from '@/components/pages/doctor/EditDoctor'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <>
            <DoctorDetailDataProvider />
        </>
    )
}

export default page