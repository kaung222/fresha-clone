'use client'
import { useState } from 'react'
import { GetTeamMember } from '@/api/member/get-teammember'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import DetailAppointment from '../calendar/drawers/detail/detail-appointment'
import CheckoutAppointmentDataProvider from '../calendar/drawers/checkout-appointment/CheckoutAppointmentDataProvider'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import PageLoading from '@/components/common/page-loading'
import ErrorPage from '@/components/common/error-state'
import TodayAppointments from '../home/today-appointment'
import BestServiceStatistics from '../home/best-service-statistics'
import BestMemberStatistics from '../home/best-member-statistics'



export default function AnalysisPage() {
    const { getQuery } = useSetUrlParams()
    const { data: allMembers, isLoading: memLoading } = GetTeamMember();
    const detailAppointmentId = getQuery('detail');
    const checkoutId = getQuery('checkout');
    const { data: organization, isLoading } = GetOrganizationProfile()


    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : organization ? (
                <>
                    <div className=" mx-auto pb-[50vh]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className=" col-span-1 lg:col-span-2  ">
                                <TodayAppointments />
                            </div>

                            <BestServiceStatistics />

                            <BestMemberStatistics />
                        </div>
                    </div>
                    {
                        detailAppointmentId && allMembers && (
                            <DetailAppointment detailAppointmentId={detailAppointmentId} allMembers={allMembers} page="table" />
                        )
                    }
                    {
                        allMembers && checkoutId && (
                            <CheckoutAppointmentDataProvider appointmentId={checkoutId} allMembers={allMembers} />
                        )
                    }
                </>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}