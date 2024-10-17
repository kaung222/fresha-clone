'use client'
import ProfileDrawer from '@/components/dashboard/team/teammember/drawer/ProfileDrawer'
import TeamMembersList from '@/components/dashboard/team/teammember/TeamMemberLists'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { getQuery } = useSetUrlParams();
    const drawer = getQuery('member-drawer');
    return (
        <>
            <TeamMembersList />
            {drawer && (
                <ProfileDrawer />
            )}
        </>
    )
}

export default Page