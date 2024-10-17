import ReviewFiltersDialog from '@/components/dashboard/profile/reviews/ReviewFilterDialog'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <main className="flex-1 p-6 h-full overflow-auto pb-20 ">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Reviews</h2>
                <ReviewFiltersDialog>
                    <Button variant="outline">Filter</Button>
                </ReviewFiltersDialog>
            </div>


        </main>
    )
}

export default Page