'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Member } from "@/types/member"
import Link from "next/link"
import { useRouter } from "next/navigation"

const profileData = {
    fullName: "Phwe Phwe",
    email: "phwephwe8812@gmail.com",
    phoneNumber: "+959881262757",
    dateOfBirth: "13 October 2005",
    country: "Myanmar",
    jobTitle: "Beauty care",
    employment: "October 10th 2024 - present",
    employmentType: "Employee",
    teamMemberId: "12354",
}

type Props = {
    member: Member
}

export default function PersonalData({ member }: Props) {
    const router = useRouter();
    return (
        <>
            {member && (
                <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Personal</h1>
                        <Link href={`/manage/teammember/${member.id}/edit`} className=" border border-gray-300 px-4 py-2 rounded-md ">
                            Edit
                        </Link>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd>{member.firstName} {member.lastName}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd>{member.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                    <dd>{member.phone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                                    <dd>{member.dob}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Country</dt>
                                    <dd>{member.country}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Job title</dt>
                                    <dd>{member.jobTitle}</dd>
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
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Employment</dt>
                                    <dd>{member.startDate}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Employment type</dt>
                                    <dd>{member.type}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Team member ID</dt>
                                    <dd>{member.memberId}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                                    <dd>{member.dob}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </main>
            )}
        </>

    )
}