'use client'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { DeleteService } from '@/api/services/delete-service'
import ConfirmDialog from '@/components/common/confirm-dialog'
import AppDropdown from '@/components/common/DropDown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { secondToHour, shortName } from '@/lib/utils'
import { Service } from '@/types/service'
import { CameraIcon, Info, MoreVertical, Percent, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

type Props = {
    service: Service;
    editable?: boolean;
    color?: string;
    notProvided?: boolean;
    memberComponent?: React.ReactNode;
    currency?: string;
}

const ServiceCard = ({ service, editable = false, color, notProvided = false, memberComponent, currency = "MMK" }: Props) => {
    const { mutate: serviceDelete, isPending: deleting } = DeleteService();
    const { getQuery, setQuery } = useSetUrlParams()


    const deleteService = (id: string) => {
        serviceDelete({ id: String(id) })
    }
    const openDetail = (id: string) => {
        setQuery({ key: "service-detail", value: id })
    }
    return (
        <>
            <div style={{ borderColor: `${color}`, background: `${color}08` }} className=" w-full flex flex-col  rounded-lg border transition-colors  ">
                <div className=' w-full flex items-center p-1 '>
                    <div className=' size-[75px] '>
                        {service.thumbnailUrl ? (
                            <PhotoView src={service.thumbnailUrl}>
                                <Image
                                    src={service.thumbnailUrl}
                                    alt={shortName(service.name)}
                                    width={400}
                                    height={300}
                                    className=' object-cover w-full h-full rounded-lg cursor-pointer '
                                />
                            </PhotoView>
                        ) : (
                            <div className=' w-full flex justify-center items-center rounded-lg h-full bg-brandColorLight/40'>
                                <div>
                                    <CameraIcon className=' w-6 h-6 ' />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" w-full flex-grow flex justify-between items-center py-4 px-6 ps-2 ">
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg tracking-tight ">{service.name} {service.type == "Package" && <Badge className=" bg-pink-200 text-pink-700 hover:bg-pink-100 ">package</Badge>}</h3>
                            <p className="text-sm text-gray-500">
                                {secondToHour(service.duration, 'duration')} {service.type == "Package" && <span className=' text-xs'>{`${service.serviceCount} services`}</span>}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                {service.discount > 0 ? (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-700 font-medium line-through">
                                                {service.price} {currency}
                                            </span>
                                            <Badge variant="secondary" className="text-green-600 bg-green-100">
                                                {service.discountType === 'percent'
                                                    ? `${service.discount}% off`
                                                    : `${service.discount} ${currency} off`}
                                            </Badge>
                                        </div>
                                        <span className="font-semibold  text-green-600">
                                            {service.discountPrice.toFixed(0)} {currency}
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-semibold ">
                                        {service.price} <span className="text-sm">{currency}</span>
                                    </span>
                                )}
                            </div>
                            {editable && (
                                <AppDropdown trigger={(
                                    <span className=' inline-block px-2 py-2 hover:bg-gray-100 rounded-lg ' >
                                        <MoreVertical className="h-4 w-4 " />
                                    </span>
                                )}>
                                    <div className=' space-y-1 w-[150px] '>
                                        <Link href={`/services/${service.id}/${service.type == 'Package' ? 'package-edit' : 'edit'}`} className=' hover:bg-gray-100 text-sm p-2 px-4 w-full block font-medium rounded-lg '>
                                            Edit {service.type == "Package" ? "Package" : "Service"}
                                        </Link>
                                        <ConfirmDialog title='Are you sure to delete?' description='It will deleted forever' onConfirm={() => deleteService(service.id)}>
                                            <span className=' w-full text-delete flex justify-start text-sm px-4 py-2 hover:bg-gray-100 '>Delete {service.type == "Package" ? "Package" : "Service"}</span>
                                        </ConfirmDialog>
                                        <Button variant={'ghost'} onClick={() => openDetail(service.id)}>
                                            <Info className=' w-4 h-4 ' />
                                        </Button>
                                    </div>
                                </AppDropdown>
                            )}
                        </div>
                    </div>
                </div>
                <div className=" w-full flex gap-2 px-4 ">
                    {memberComponent}
                    {notProvided && (
                        <div className=' flex-grow text-center w-full text-orange-400 '>This member don&apos;t provide this service</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ServiceCard