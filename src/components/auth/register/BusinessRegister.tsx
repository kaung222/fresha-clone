'use client'
import React, { useState } from 'react'
import ServiceSelection from './stepper/offered-service'
import BusinessSetUp from './stepper/business-data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import UserAccount from './stepper/user-account'

type Props = {}

const BusinessRegister = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const step = getQuery('step');



    return (
        <div className=" p-6">
            <div className="mb-8 w-full flex justify-between gap-3">
                <div className={`w-full ${(!step || step == 'business') ? " bg-gray-800 " : " bg-gray-200"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "service" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "admin-user" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                </div>
            </div>
            {step == "admin-user" ? (
                <UserAccount />
            ) : step == "service" ? (
                <ServiceSelection />
            ) : (
                <BusinessSetUp />
            )}

        </div>
    )
}

export default BusinessRegister