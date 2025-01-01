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
import { ChevronDown, ImageIcon, Star } from 'lucide-react'
import { GetOrganizationProfile } from "@/api/organization/get-organization-profile"
import AppDropdown from "@/components/common/DropDown"
import Link from "next/link"
import PageLoading from "@/components/common/page-loading"
import Image from "next/image"
import { format } from "date-fns"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from "@/lib/utils"
import ErrorPage from "@/components/common/error-state"
import CommonHeader from "@/components/common/common-header"



export default function PublishedPage() {
    const { data: organization, isLoading } = GetOrganizationProfile()
    return (
        <div className="w-full pb-[500px]">
            <div className="flex justify-between items-start mb-4">
                <CommonHeader title='Publish Business' currentIndex={13} para='Attract new clients to book online via your business profile on user marketplace.' />

                {/* <div>
                    <h1 className="text-2xl font-semibold mb-2">Publish Business</h1>
                    <p className="text-muted-foreground mb-1 hidden md:block ">
                        Attract new clients to book online via your business profile on user marketplace.
                    </p>
                </div> */}
                <div>
                    {/* <div>
                    <Link href={`/publication/public`} className=' px-4 py-2 bg-brandColor text-white rounded-lg hover:bg-brandColor/90 '>Publish</Link>
                    </div> */}

                    {/* <AppDropdown trigger={(
                        <span className=" flex items-center px-4 py-2 rounded-lg border  ">
                            Options <ChevronDown className="ml-2 h-4 w-4" />
                        </span>
                    )}>
                        <div className=" ">
                            <Link href={`/publication/public`} className=" w-full px-4 py-2 rounded-lg hover:bg-gray-100 " >Publish</Link>
                        </div>
                    </AppDropdown> */}
                </div>
            </div>
            {isLoading ? (
                <PageLoading />
            ) : organization ? (
                <Card className="p-6 ">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className=" w-full md:w-72 aspect-video relative md:aspect-auto md:h-48 rounded-md overflow-hidden">
                            {organization.images && organization.images.length > 0 ? (
                                organization.images.map((image, index) => (
                                    <PhotoView src={image} key={index}>
                                        {index > 0 ? (
                                            <div className="hidden"></div>
                                        ) : (
                                            <div className=" w-full aspect-[5/4] ">
                                                <Avatar className=' w-full h-full rounded-sm '>
                                                    <AvatarImage src={image} className=' w-full h-full object-cover ' alt={shortName(organization.name)} width={500} height={400} />
                                                    <AvatarFallback className="rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        )}
                                    </PhotoView>
                                ))
                            ) : (
                                <div className=" w-full h-full flex justify-center items-center bg-gray-100 ">
                                    <ImageIcon className=" size-14 " />
                                </div>
                            )}
                            <div className=" bg-[#ffffff] rounded-lg px-2 absolute top-1 right-1 flex ">{organization.images ? organization.images.length : '0'} <ImageIcon className=' size-6' /> </div>

                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{organization.name}</h2>
                                    <p className="text-muted-foreground mb-4">
                                        {organization.address}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="h-5 w-5 fill-primary text-primary" />
                                        <span className="font-medium">{organization.rating} Great</span>
                                        <span className="text-muted-foreground">({organization.totalReviews})</span>
                                    </div>
                                    {organization.isPublished ? (
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                                            Published
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                            UnPublished
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Updated {format(new Date(organization.updatedAt), "EEE dd MMM, yyyy")}
                                </div>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <Button variant="brandOutline" size="lg">
                                    Preview
                                </Button>
                                <Link href={`/publication/public`} className=" px-4 py-2 rounded-lg bg-brandColor hover:bg-brandColor/90 text-white " >
                                    {organization.isPublished ? "Edit Publish" : "Publish"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ) : (
                <ErrorPage />
            )}
        </div>
    )
}

