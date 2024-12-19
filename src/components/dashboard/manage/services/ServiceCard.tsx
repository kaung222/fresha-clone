'use client'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { DeleteService } from '@/api/services/delete-service'
import ConfirmDialog from '@/components/common/confirm-dialog'
import ControllableDropdown from '@/components/common/control-dropdown'
import AppDropdown from '@/components/common/DropDown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { secondToHour, shortName } from '@/lib/utils'
import { Service } from '@/types/service'
import { AlertCircle, CameraIcon, Info, MoreVertical, Pencil, Percent, Trash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
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
    const { getQuery, setQuery } = useSetUrlParams();
    const [open, setOpen] = useState(false);


    const deleteService = (id: string) => {
        serviceDelete({ id: String(id) })
    }
    const openDetail = (id: string) => {
        setQuery({ key: "service-detail", value: id });
        setOpen(false)
    }
    return (
        <>
            <div style={{ borderColor: `${color}`, background: `${color}08` }} className=" w-full flex flex-col  rounded-lg border transition-colors  ">
                <div className=' w-full flex items-center p-1 '>
                    <div className=' size-[96px] '>
                        {service.thumbnailUrl ? (
                            <Avatar className=' w-full h-full rounded-sm '>
                                <AvatarImage src={service.thumbnailUrl} alt={shortName(service.name)} className=' object-cover ' />
                                <AvatarFallback className=" rounded-sm">{shortName(service.name)}</AvatarFallback>
                            </Avatar>

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
                            {memberComponent}
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
                                <ControllableDropdown open={open} setOpen={setOpen} trigger={(
                                    <span className=' inline-block px-2 py-2 hover:bg-gray-100 rounded-lg ' >
                                        <MoreVertical className="h-4 w-4 " />
                                    </span>
                                )}>
                                    <div className=' space-y-1 w-[180px] '>
                                        <Link href={`/services/${service.id}/${service.type == 'Package' ? 'package-edit' : 'edit'}`} className=' hover:bg-gray-100 text-sm p-2 px-4 w-full font-medium rounded-lg flex items-center '>
                                            <Pencil className=' w-4 h-4 mr-2 flex-shrink-0 ' /> Edit {service.type == "Package" ? "Package" : "Service"}
                                        </Link>
                                        <ConfirmDialog title='Are you sure to delete?' description='It will deleted forever' onConfirm={() => deleteService(service.id)}>
                                            <span className='rounded-lg w-full text-delete flex justify-start items-center text-sm px-4 py-2 hover:bg-gray-100 '><Trash className=' w-3 h-3 mr-2 flex-shrink-0 ' /> Delete {service.type == "Package" ? "Package" : "Service"}</span>
                                        </ConfirmDialog>
                                        <Button variant={'ghost'} className=' w-full flex justify-start items-center ' onClick={() => openDetail(service.id)}>
                                            <Info className=' w-4 h-4 mr-2 flex-shrink-0' /> Info
                                        </Button>
                                    </div>
                                </ControllableDropdown>
                            )}
                        </div>
                    </div>
                </div>
                <div className=" w-full flex gap-2 px-4 ">
                    {notProvided && (
                        <div className="mt-2 flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Service is not served by this member!
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ServiceCard