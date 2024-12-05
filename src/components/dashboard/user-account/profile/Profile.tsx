'use client'
import { Star, MapPin, Phone, DollarSign, FileText, Globe, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import PageLoading from '@/components/common/page-loading'
import { shortName } from '@/lib/utils'


export default function Profile() {

    const { data: organization, isLoading } = GetOrganizationProfile();

    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : organization && (
                <div className=" p-10 w-full overflow-auto ">
                    <Card className="w-full ">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{organization.name}</CardTitle>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{organization.address}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    {organization.images && organization.images.length > 0 ? (
                                        <div className="aspect-video max-w-[500px] relative overflow-hidden rounded-lg">
                                            <Image
                                                src={organization.images[0]}
                                                alt={shortName(organization.name)}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className=' w-full max-w-[500px] aspect-video bg-gray-200 rounded-lg flex justify-center items-center '>
                                            <div>
                                                <ImageIcon className=' size-20 ' />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <span className="font-semibold">{organization.rating?.toFixed(1)}</span>
                                        <span className="text-muted-foreground">({organization.totalReviews} reviews)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {organization.types?.map((type, index) => (
                                            <Badge key={index} variant="secondary">{type}</Badge>
                                        ))}
                                    </div>
                                    {organization.phones && organization.phones.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4" />
                                            <span>{organization.phones[0]}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>{organization.currency}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="aspect-video relative overflow-hidden rounded-lg">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d244377.0218613538!2d96.1208935!3d16.856543499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1733321451137!5m2!1sen!2ssg"}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold flex items-center space-x-2">
                                            <FileText className="w-4 h-4" />
                                            <span>Notes</span>
                                        </h3>
                                        <p className="text-muted-foreground">{organization.notes}</p>
                                    </div>
                                    {organization.isPublished ? (
                                        <Badge >Published</Badge>
                                    ) : (
                                        <Badge variant="destructive">Not Published</Badge>
                                    )}
                                    <Button className="w-full">
                                        <Globe className="w-4 h-4 mr-2" />
                                        Visit Website
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

