'use client'
import React, { useState } from 'react'
import ServiceSelection from './stepper/offered-service'
import BusinessSetUp from './stepper/business-data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import UserAccount from './stepper/user-account'
import SuccessRegister from './stepper/success-register-page'

type Props = {}

const BusinessRegister = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const step = getQuery('step');


    return (
        <div className=" p-6">
            <div className="mb-8 w-full flex justify-between gap-3">
                <div className={`w-full ${(!step || step == 'business') ? " bg-brandColor " : " bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "service" ? "bg-brandColor" : "bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "admin-user" ? "bg-brandColor" : "bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
            </div>
            {step == "admin-user" ? (
                <UserAccount />
            ) : step == "service" ? (
                <ServiceSelection />
            ) : step == "success" ? (
                <SuccessRegister />
            ) : (
                <BusinessSetUp />
            )}

        </div>
    )
}

export default BusinessRegister