'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'
import BasicDetail from './BasicDetail'
import TeamMember from './Teammember'

type Props = {}

const AddServiceApp = (props: Props) => {
    const { getQuery } = useSetUrlParams();
    const section = getQuery('section')

    return (
        <>
            {(!section || section == "basic-detail") && (
                <BasicDetail />
            )}
            {section == 'team-members' && (
                <TeamMember />
            )}
        </>
    )
}

export default AddServiceApp