'use client'
import React, { useState } from 'react'
import ServiceSelection from './stepper/offered-service'
import BusinessSetUp from './stepper/business-data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import UserAccount from './stepper/user-account'
import SuccessRegister from './stepper/success-register-page'
import LogoWithBrand from '@/components/common/LogoWithBrand'
import Link from 'next/link'

type Props = {}

const BusinessRegister = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const step = getQuery('step');


    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
                        <p className="text-gray-600">Create an account to manage your business.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <UserAccount />
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className=" text-center text-sm text-gray-600 ">
                                Already have an account?
                                <Link href="/login" className="font-medium text-brandColor hover:underline ">
                                    &nbsp;Log In
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Need help?{' '}
                            <a href="/contact" className="font-medium text-[#FF66A1] hover:underline">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>

            {step == "success" && (
                <SuccessRegister />
            )}


            {/* <div className=" ">
            <div className="mb-8 w-full flex justify-between items-center px-6 h-[80px] bg-white shadow-dialog gap-3 sticky top-0">
                <div className={`w-full ${(!step || step == 'business') ? " bg-brandColor " : " bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "service" ? "bg-brandColor" : "bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
                <div className={`w-full ${step == "admin-user" ? "bg-brandColor" : "bg-brandColorLight/50"}  rounded-full h-2.5 mb-4`}>
                </div>
            </div>
            <div className=' px-6 '>
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

        </div> */}
        </>
    )
}

export default BusinessRegister