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

type Props = {}

const Profile = (props: Props) => {
    const { data: profileData, isLoading } = GetUserProfile('13');

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
                                <Button variant="outline">Edit</Button>
                            </EditProfileDialog>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex flex-col items-center mb-4">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={profileData.profilePictureUrl} alt={shortName(profileData.firstName)} />
                                    <AvatarFallback className="text-3xl bg-purple-100 text-purple-600">{shortName(profileData.firstName)}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Joined {format(new Date(profileData.createdAt), "dd MMM yyy")}
                                </div>
                                <div className="flex items-center">
                                    <Globe className="mr-2 h-4 w-4" />
                                    Myanmar (Burma)
                                </div>
                                <div className="flex items-center">
                                    <Star className="mr-2 h-4 w-4" />
                                    No reviews
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">About me</h3>
                            <Button variant="link" className="text-purple-600">{profileData.notes || 'Add description'}</Button>
                        </div>
                    </main>
                )
            )}
        </>
    )
}

export default Profile