'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar, Globe, Star } from 'lucide-react'
import React, { useState } from 'react'
import EditProfileDialog from './EditProfileBox'
import { GetUserProfile } from '@/api/profile/get-user-profile'
import PageLoading from '@/components/common/page-loading'
import { shortName } from '@/lib/utils'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import Link from 'next/link'

type Props = {}

const Profile = (props: Props) => {
    const { data: profileData, isLoading } = GetUserProfile('13');
    const { data: organization } = GetOrganizationProfile()

    const DataUiSet = ({ title, value, values }: { title: string, value: string, values?: string[] }) => {
        return (
            <div>
                <dt className=" font-semibold text-gray-800">{title}</dt>
                <dd className=" text-sm font-medium text-gray-600 ">{value}</dd>
                {values?.map((v, index) => (
                    <dd key={index} className=" text-sm font-medium text-gray-600 ">{v}</dd>

                ))}
            </div>
        )
    }

    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : (
                profileData && (
                    <main className="flex-1 p-6 h-full overflow-auto pb-20 ">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Your profile</h2>
                            <EditProfileDialog>
                                <Link href={`/manage/teammembers/${profileData.id}/edit`} className=" bg-white rounded-lg px-4 py-2 border hover:bg-gray-100 ">Edit</Link>
                            </EditProfileDialog>
                        </div>

                        <Card className=" mb-6 ">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={profileData.profilePictureUrl || undefined} alt={shortName(profileData.firstName)} />
                                    <AvatarFallback>{shortName(profileData.firstName)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl">{profileData.firstName} {profileData.lastName}</CardTitle>
                                    <p className="text-gray-500">{profileData.email}</p>
                                    <div className="flex items-center gap-4 mt-1 ">
                                        <Badge variant="secondary">Rating: {profileData.rating.toFixed(1)}</Badge>
                                        <Badge variant="outline">Reviews: {profileData.ratingCount}</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <DataUiSet title="Full Name" value={`${profileData.firstName} ${profileData.lastName}`} />
                                    <DataUiSet title="Email" value={profileData.email} />
                                    <DataUiSet title="Phone Number" value={profileData.phone ? profileData.phone : "--"} />
                                    <DataUiSet title="Date of birth" value={profileData.dob ? format(new Date(profileData.dob), "dd MM yyy") : "--"} />
                                    <DataUiSet title="Country" value={profileData.country ? profileData.country : "--"} />
                                    <DataUiSet title="Languages" value="" values={profileData.languageProficiency ? profileData.languageProficiency : ['--']} />
                                    <DataUiSet title="Job title" value={profileData.jobTitle ? profileData.jobTitle : "--"} />
                                    <DataUiSet title="Commission" value={profileData.commissionFeesType == 'percent' ? `${profileData.commissionFees}%` : `${profileData.commissionFees} ${organization?.currency}`} />
                                    <div className=" col-span-1 sm:col-span-2 ">
                                        <DataUiSet title="Notes" value={profileData.notes ? profileData.notes : "--"} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Work Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DataUiSet title="Employment type" value={profileData.type ? profileData.type : '--'} />
                                    <DataUiSet title="Employment date" value={profileData.startDate ? format(new Date(profileData.startDate), "dd MM yyyy") : '--'} />
                                    <DataUiSet title="profileData ID" value={profileData.memberId ? profileData.memberId : "--"} />
                                    <DataUiSet title="Provided" value={`${profileData.services?.length || 0} services`} />
                                </dl>
                            </CardContent>
                        </Card>

                    </main>
                )
            )}
        </>
    )
}

export default Profile