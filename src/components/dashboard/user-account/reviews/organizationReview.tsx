'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SlidersHorizontal, Star, Users } from 'lucide-react'
import ReviewFiltersDialog from "./ReviewFilterDialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarRating from "./StarRating"
import { GetOrganizationReviews } from "@/api/reviews/get-organization-review"
import { formatDistanceToNow } from "date-fns"
import { shortName } from "@/lib/utils"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import DetailAppointment from "../../calendar/drawers/detail/detail-appointment"
import { GetTeamMember } from "@/api/member/get-teammember"
import PaginationBar from "@/components/common/PaginationBar"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganizationReview } from "@/types/review"

// const ratingOptions = ['All', '5 stars', '4 stars', '3 stars', '2 stars', '1 star'];
const ratingOptions: { text: string, value: number }[] = [
    { text: "All", value: 0 }, // 0 represent for all
    { text: "5 stars", value: 5 },
    { text: "4 stars", value: 4 },
    { text: "3 stars", value: 3 },
    { text: "2 stars", value: 2 },
    { text: "1 stars", value: 1 },
]


export default function OrganizationReviewPage() {
    const { getQuery, setQuery } = useSetUrlParams();
    const detailAppointmentId = getQuery('detail');
    const { data: review } = GetOrganizationReviews();
    const { data: allMembers } = GetTeamMember();
    const [ratingFilter, setRatingFilter] = useState<number>(0)

    const viewDetailAppointment = (id: string) => {
        setQuery({ key: 'detail', value: id })
    }

    const filteredReview = (reviews: OrganizationReview[], filter: number) => {
        return reviews.filter((review) => {
            return filter == 0 ? true : filter == review.rating
        })

    }

    return (
        <>

            <main className="flex-1 p-3 md:p-10 h-full overflow-auto ">
                <div className="flex justify-between items-center mb-6 gap-2">
                    <h2 className="text-3xl font-bold">Reviews</h2>
                    <Select value={String(ratingFilter)} onValueChange={(e) => setRatingFilter(Number(e))}>
                        <SelectTrigger style={{ display: 'flex' }} className=" w-[180px] ">
                            <SelectValue placeholder={(
                                <span className=" flex items-center gap-1 ">
                                    <Star className=' w-4 h-4 ' /> <span>All Rating</span>
                                </span>
                            )} />
                        </SelectTrigger>
                        <SelectContent className=' max-h-[200px] z-[70] '>
                            {ratingOptions.map((rating, index) => (
                                <SelectItem key={index} value={String(rating.value)}>{rating.text}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4 mb-20">
                    {filteredReview(review?.records || [], ratingFilter).length == 0 ? (
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
                    ) : review?.records && (
                        filteredReview(review.records, ratingFilter).map((rev) => (
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
                                            <AvatarImage src={rev?.user?.profilePicture} alt={shortName(rev.user?.firstName)} />
                                            <AvatarFallback>{shortName(rev.user?.firstName)}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <StarRating rating={rev.rating} />

                                    <p className="my-4">{rev.notes}</p>

                                    <div onClick={() => viewDetailAppointment(rev.appointmentId)} className="flex gap-2">
                                        <Button variant="outline">View appointment</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
                <PaginationBar totalPages={review?._metadata.pageCount || 1} totalResult={review?._metadata.totalCount} />
            </main>

            {detailAppointmentId && allMembers && (
                <DetailAppointment detailAppointmentId={detailAppointmentId} allMembers={allMembers} />
            )}
        </>




    )
}