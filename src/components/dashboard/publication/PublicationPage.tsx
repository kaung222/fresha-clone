'use client'
import React, { useState } from 'react'
import ServiceSelection from './stepper/offered-service'
import BusinessSetUp from './stepper/business-data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import SuccessRegister from './stepper/success-publication'
import LocationSetUp from './stepper/location-setup'
import TimeTableSetup from './stepper/timetable-setup'


type Props = {}


const PublicationPage = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const step = getQuery('step');


    return (
        <div className=" px-6 pb-6 w-screen h-screen fixed top-0 left-0 z-[60] bg-white overflow-y-auto ">
            <div className="mb-8 w-full flex justify-between gap-3 sticky top-0 bg-white items-center h-[80px] z-[15] ">
                <div className={`w-full ${(!step || step == 'business') ? " bg-gray-800 " : " bg-gray-200"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "service" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "location-setup" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "timetable" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                </div>
            </div>
            <LocationSetUp />
            {/* {step == "location-setup" ? (
                <LocationSetUp />
            ) : step == "service" ? (
                <ServiceSelection />
            ) : step == "success" ? (
                <SuccessRegister />
            ) : step == 'timetable' ? (
                <TimeTableSetup />
            ) : (
                <BusinessSetUp />
            )} */}

        </div>
    )
}

export default PublicationPage