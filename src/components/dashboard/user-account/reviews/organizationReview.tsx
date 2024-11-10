'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SlidersHorizontal, Star } from 'lucide-react'
import ReviewFiltersDialog from "./ReviewFilterDialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import StarRating from "./StarRating"
import { GetOrganizationReviews } from "@/api/reviews/get-organization-review"
import { formatDistanceToNow } from "date-fns"

interface Review {
    id: string
    rating: number
    author: string
    time: string
    comment: string
}

const reviews: Review[] = [
    {
        id: '1',
        rating: 4,
        author: 'Ko',
        time: '22 hours ago',
        comment: 'best'
    },
    {
        id: '2',
        rating: 5,
        author: 'Ko',
        time: '22 hours ago',
        comment: "it's good test"
    }
]

export default function OrganizationReview() {
    const { data: review } = GetOrganizationReviews();

    return (

        <main className="flex-1 p-6 h-full overflow-auto pb-20 ">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Reviews</h2>
                <ReviewFiltersDialog>
                    <span className=" border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 ">Filter</span>
                </ReviewFiltersDialog>
            </div>

            <div className="space-y-4">
                {review?.records.length == 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <Star className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">No reviews yet</h2>
                            <p className="text-gray-500 text-center">
                                Clients have not provided feedback for their appointments yet.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    review?.records.map((rev) => (
                        <Card key={rev.id}>
                            <CardContent className="p-6">
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">
                                                5 star review from author
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(rev.createdAt), { addSuffix: true })}</p>
                                    </div>
                                    <Avatar className="h-10 w-10 bg-blue-600">
                                        <AvatarFallback>author</AvatarFallback>
                                    </Avatar>
                                </div>

                                <StarRating rating={4} />

                                <p className="my-4">{rev.notes}</p>

                                <div className="flex gap-2">
                                    <Button variant="outline">Reply</Button>
                                    <Button variant="outline">View appointment</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </main>




    )
}