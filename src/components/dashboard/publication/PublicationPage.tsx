'use client'
import React, { useState } from 'react'
import ServiceSelection from './stepper/offered-service'
import BusinessSetUp from './stepper/business-data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import LocationSetUp from './stepper/location-setup'
import TimeTableSetup from './stepper/timetable-setup'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import ImagesSetup from './stepper/images-setup'
import { Badge } from '@/components/ui/badge'
import SuccessPublication from './stepper/success-publication'


type Props = {}


const PublicationPage = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const { data: organization } = GetOrganizationProfile();
    const step = getQuery('step');


    return (
        <>
            {organization && (
                <div className=" px-3 sm:px-6 md:px-10 pb-6 w-screen h-screen fixed top-0 left-0 z-[60] bg-white overflow-auto ">
                    <div className="mb-8 w-full flex justify-between gap-3 sticky top-0 bg-white items-center h-[80px] z-[52] border-b ">
                        <div className=" flex flex-col items-center flex-grow text-xs sm:text-sm ">
                            <div className={`w-full ${(!step || step == 'business') ? " bg-gray-800 " : " bg-gray-200"}  rounded-full h-2.5 mb-4`}>
                            </div>
                            <Badge variant="outline" className=" hidden sm:block">basic info</Badge>
                        </div>
                        <div className=" flex flex-col items-center flex-grow text-xs sm:text-sm ">
                            <div className={`w-full ${step == "service" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                            </div>
                            <Badge variant={'outline'} className=" hidden sm:block">service types</Badge>
                        </div>
                        <div className=" flex flex-col items-center flex-grow text-xs sm:text-sm ">
                            <div className={`w-full ${step == "location-setup" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                            </div>
                            <Badge variant={'outline'} className=" hidden sm:block">location setup</Badge>
                        </div>
                        <div className=" flex flex-col items-center flex-grow text-xs sm:text-sm ">
                            <div className={`w-full ${step == "timetable" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                            </div>
                            <Badge variant={'outline'} className=" hidden sm:block">opening hours</Badge>
                        </div>
                        <div className=" flex flex-col items-center flex-grow text-xs sm:text-sm ">
                            <div className={`w-full ${step == "images" ? "bg-gray-800" : "bg-gray-200"} bg-gray-200 rounded-full h-2.5 mb-4`}>
                            </div>
                            <Badge variant={'outline'} className=" hidden sm:block">images</Badge>
                        </div>
                    </div>
                    {step == "location-setup" ? (
                        <LocationSetUp organization={organization} />
                    ) : step == "service" ? (
                        <ServiceSelection organization={organization} />
                    ) : step == "success" ? (
                        <SuccessPublication organization={organization} />
                    ) : step == 'timetable' ? (
                        <TimeTableSetup organization={organization} />
                    ) : step == 'images' ? (
                        <ImagesSetup organization={organization} />
                    ) : (
                        <BusinessSetUp organization={organization} />
                    )}
                </div>
            )}
        </>
    )
}

export default PublicationPage