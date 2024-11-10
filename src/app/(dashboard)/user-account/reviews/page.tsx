import OrganizationReview from '@/components/dashboard/user-account/reviews/organizationReview'
import ReviewFiltersDialog from '@/components/dashboard/user-account/reviews/ReviewFilterDialog'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <OrganizationReview />
        </>
    )
}

export default Page