'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Star } from 'lucide-react'
import { GetOrganizationProfile } from "@/api/organization/get-organization-profile"
import AppDropdown from "@/components/common/DropDown"
import Link from "next/link"
import PageLoading from "@/components/common/page-loading"
import Image from "next/image"
import { format } from "date-fns"

export default function PublishedPage() {
    const { data: organization, isLoading } = GetOrganizationProfile()
    return (
        <div className="w-full  p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">Publish Business</h1>
                    <p className="text-muted-foreground mb-1">
                        Attract new clients to book online via your business profile on user marketplace.
                    </p>
                </div>
                <div>
                    <AppDropdown trigger={(
                        <span className=" flex items-center px-4 py-2 rounded-lg border  ">
                            Options <ChevronDown className="ml-2 h-4 w-4" />
                        </span>
                    )}>
                        <div className=" ">
                            <Link href={`/publication/public`} className=" w-full px-4 py-2 rounded-lg hover:bg-gray-100 " >Publish</Link>
                        </div>
                    </AppDropdown>
                </div>
            </div>
            {isLoading ? (
                <PageLoading />
            ) : organization && (
                <Card className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="w-full">
                            <Image
                                src={organization.images && organization.images[0] || ''}
                                alt={organization.name}
                                width={500}
                                height={400}
                                className=" w-full object-cover rounded-lg aspect-video "
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">{organization.name}</h2>
                                    <p className="text-muted-foreground mb-2">
                                        Yangon Airport Road, Yangon, Yangon Region
                                    </p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Star className="h-5 w-5 fill-primary text-primary" />
                                        <span className="font-medium">{organization.rating} Great</span>
                                        <span className="text-muted-foreground">({organization.totalReviews})</span>
                                    </div>
                                    <Badge variant={'secondary'} className="bg-emerald-500">Online</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Updated {format(new Date(organization.updatedAt), "EEE dd MMM, yyyy")}
                                </p>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <Link href={`/publication/public`} className=" px-4 py-2 rounded-lg border hover:bg-gray-100 ">Edit Publication</Link>
                                <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                                    View on Fresha
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}