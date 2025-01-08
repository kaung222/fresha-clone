'use client'
import AppointmentChart from './appointment-chart'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import PageLoading from '@/components/common/page-loading'
import ErrorPage from '@/components/common/error-state'




export default function Dashboard() {
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
                                <AppointmentChart currency={organization?.currency} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}