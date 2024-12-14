'use client'
import { GetOrganizationProfile } from "@/api/organization/get-organization-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { secondToHour } from "@/lib/utils"
import { Member } from "@/types/member"
import { Service } from "@/types/service"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
    service: Service
}

export default function ServiceDetail({ service }: Props) {
    const router = useRouter();
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
            {service && (
                <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-3 md:p-8 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Service Detail</h1>
                        <Link href={`/services/${service.id}/edit`} className=" border border-brandColor text-brandColor hover:bg-brandColorLight/40 px-4 py-2 rounded-md ">
                            Edit
                        </Link>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DataUiSet title="Service Name" value={service.id} />
                                <DataUiSet title="Category" value={service.category.name} />
                                <DataUiSet title="Original Price" value={service.price} />
                                <DataUiSet title="Discount" value={service.discountType == "percent" ? `${service.discount}%` : `${service.discount}${organization?.currency}`} />
                                <DataUiSet title="Sale Price" value={service.discountPrice.toString()} />
                                <DataUiSet title="Service Duration" value={secondToHour(service.duration)} />
                                <DataUiSet title="Type" value={service.type} />
                                <DataUiSet title="Provided By" value={`${service.members?.length || 0} members`} />
                                <div className=" col-span-1 sm:col-span-2 ">
                                    <DataUiSet title="Description" value={service.description} />
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Work Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DataUiSet title="Employment type" value={member.type ? member.type : '--'} />
                                <DataUiSet title="Employment date" value={member.startDate ? format(new Date(member.startDate), "dd MM yyyy") : '--'} />
                                <DataUiSet title="Member ID" value={member.memberId ? member.memberId : "--"} />
                                <DataUiSet title="Provided" value={`${member.services?.length || 0} services`} />
                            </dl>
                        </CardContent>
                    </Card> */}
                </main>
            )}
        </>

    )
}