'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Member } from "@/types/member"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
    member: Member
}

export default function PersonalData({ member }: Props) {
    const router = useRouter();

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
            {member && (
                <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Personal</h1>
                        <Link href={`/teammembers/${member.id}/edit`} className=" border border-gray-300 px-4 py-2 rounded-md ">
                            Edit
                        </Link>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DataUiSet title="Full Name" value={`${member.firstName} ${member.lastName}`} />
                                <DataUiSet title="Email" value={member.email} />
                                <DataUiSet title="Phone Number" value={member.phone ? member.phone : "--"} />
                                <DataUiSet title="Date of birth" value={member.dob ? format(new Date(member.dob), "dd MM yyy") : "--"} />
                                <DataUiSet title="Country" value={member.country ? member.country : "--"} />
                                <DataUiSet title="Languages" value="" values={member.languageProficiency ? member.languageProficiency : ['--']} />
                                <DataUiSet title="Job title" value={member.jobTitle ? member.jobTitle : "--"} />
                                <div className=" col-span-1 sm:col-span-2 ">
                                    <DataUiSet title="Notes" value={member.notes ? member.notes : "--"} />
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
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
                    </Card>
                </main>
            )}
        </>

    )
}