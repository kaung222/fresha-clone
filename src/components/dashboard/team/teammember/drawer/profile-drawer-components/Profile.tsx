import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function PersonalData() {
    return (
        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Personal</h1>
                <Button variant="outline">
                    Edit
                </Button>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd>{profileData.fullName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd>{profileData.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                            <dd>{profileData.phoneNumber}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                            <dd>{profileData.dateOfBirth}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Country</dt>
                            <dd>{profileData.country}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Job title</dt>
                            <dd>{profileData.jobTitle}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Work Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Employment</dt>
                            <dd>{profileData.employment}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Employment type</dt>
                            <dd>{profileData.employmentType}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Team member ID</dt>
                            <dd>{profileData.teamMemberId}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                            <dd>{profileData.dateOfBirth}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </main>
    )
}