'use client'
import { GetAllCategories } from '@/api/services/categories/get-all-categories';
import CircleLoading from '@/components/layout/circle-loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { secondToHour } from '@/lib/utils';
import { Service } from '@/types/service';
import { Check, MoveLeft, Scissors, Search, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Category } from '@/types/category';
import { AppointmentService } from '@/types/appointment';
import { Member, MemberForAll } from '@/types/member';
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard';
import Link from 'next/link';

type Props = {
    setShowServiceSelect: Dispatch<SetStateAction<boolean>>;
    showServiceSelect: boolean;
    setSelectedService: Dispatch<SetStateAction<AppointmentService[]>>;
    selectedServices: AppointmentService[];
    defaultMember: MemberForAll;
}

const SelectServiceForAppointment = ({ setShowServiceSelect, showServiceSelect, selectedServices, setSelectedService, defaultMember }: Props) => {
    const [serviceSearch, setServiceSearch] = useState('');
    const { data: allCategories, isLoading } = GetAllCategories();

    const handleServiceToggle = (service: Service) => {
        setSelectedService(prev => prev.map(ser => ser.id).includes(service.id) ? prev.filter(ser => ser.id != service.id) : [...prev, { ...service, providedMember: defaultMember }])
    };

    const isSelected = (id: number) => {
        const isSelect = selectedServices.flatMap((ser) => ser.id).includes(id)
        return isSelect
    }

    const searchedResultCategory = (categories: Category[], search: string) => {
        const result = categories.map(cat => ({ ...cat, services: cat.services.filter((ser) => ser.name.toLowerCase().includes(search.toLowerCase())) }))
        return result;
    }

    const isMemberProvideService = (members: MemberForAll, serviceId: number) => {
        return members.services.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <div className={`w-full h-full bg-[#020202b0]  absolute top-0 right-0 z-[62] ${showServiceSelect ? 'block' : 'hidden'}`}>
            <div onClick={() => setShowServiceSelect(false)} className=' w-full h-full '></div>
            <div className={`w-full md:w-[480px] pt-0 animate__animated animate__backInRight bg-white h-full absolute z-10 top-0 right-0 overflow-auto `}>
                <div className=' pt-4 bg-white px-8 h-[120px] border-b border-gray-300 '>
                    <div className=' flex items-center justify-between '>
                        <Button variant={'ghost'} onClick={() => setShowServiceSelect(false)} className=' top-5 left-5 '>
                            <MoveLeft className=' w-4 h-4 ' />
                        </Button>
                        <h2 className="text-2xl font-bold mb-4">Select services</h2>
                    </div>
                    <div className=" relative ">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 " />
                        {serviceSearch && (
                            <X onClick={() => setServiceSearch('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                        )}
                        <Input
                            type="text"
                            placeholder="Search by service name"
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            className="w-full pl-10 h-12 py-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                        />
                    </div>
                </div>
                <ScrollArea className="space-y-8 h-h-full-minus-120 px-8 ">
                    {isLoading ? (
                        <CircleLoading />
                    ) : allCategories && allCategories.length > 0 ? (
                        searchedResultCategory(allCategories, serviceSearch)?.map((category) => (
                            <div key={category.id} className={`space-y-2 mb-5 ${category.services.length == 0 ? 'hidden' : ''} `}>
                                <h3 style={{ color: `${category.colorCode}` }} className="text-xl font-semibold flex items-center gap-2 ">
                                    {category.name} <span style={{ background: `${category.colorCode}` }} className="text-sm font-normal w-5 h-5 rounded-full text-white flex justify-center items-center ">{category.services?.filter(ser => ser.type != "Package").length}</span>
                                </h3>
                                <div className="space-y-4">
                                    {category.services?.filter((ser) => ser.type != 'Package').map((service) => (
                                        <div key={service.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`service-${service.id}`}
                                                checked={isSelected(service.id)}
                                                onCheckedChange={() => handleServiceToggle(service)}
                                            />
                                            <Label htmlFor={`service-${service.id}`} className="flex items-center w-full gap-4">
                                                <ServiceCard color={category.colorCode} service={service} notProvided={!isMemberProvideService(defaultMember, service.id)} />
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[300px]">
                            <Scissors className="h-12 w-12 text-brandColorLight mb-2" />
                            <p className=" text-xl font-bold">No Services yet.</p>
                            <p className=" text-muted-foreground"> <Link href={`/manage/services/create`} className=" font-medium text-blue-600 ">Create Service</Link>  & to make appointment here.</p>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}

export default SelectServiceForAppointment