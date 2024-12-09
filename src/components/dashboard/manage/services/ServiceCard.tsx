'use client'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { DeleteService } from '@/api/services/delete-service'
import ConfirmDialog from '@/components/common/confirm-dialog'
import AppDropdown from '@/components/common/DropDown'
import { Badge } from '@/components/ui/badge'
import { secondToHour } from '@/lib/utils'
import { Service } from '@/types/service'
import { MoreVertical, Percent, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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


    const deleteService = (id: number) => {
        serviceDelete({ id: String(id) })
    }
    return (
        <>
            <div style={{ borderColor: `${color}`, background: `${color}08` }} className=" w-full flex flex-col py-4 px-6 rounded-lg border transition-colors  ">
                <div className=" w-full flex justify-between items-center ">
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
                                </div>
                            </AppDropdown>
                        )}
                    </div>
                </div>
                <div className=" w-full flex gap-2 ">
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