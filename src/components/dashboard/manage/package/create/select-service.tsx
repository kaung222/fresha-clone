'use client'
import { GetAllCategories } from '@/api/services/categories/get-all-categories';
import CircleLoading from '@/components/layout/circle-loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { secondToHour } from '@/lib/utils';
import { Service } from '@/types/service';
import { Check, MoveLeft, Search } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    setShowServiceSelect: Dispatch<SetStateAction<boolean>>;
    showServiceSelect: boolean;
    addSelectService: (service: Service) => void;
    selectedServices: Service[];
}

const SelectServiceForPackage = ({ setShowServiceSelect, showServiceSelect, addSelectService, selectedServices }: Props) => {
    const [serviceSearch, setServiceSearch] = useState('');
    const { data: allCategories, isLoading } = GetAllCategories();

    const isSelected = (id: number) => {
        const isSelect = selectedServices.flatMap((ser) => ser.id).includes(id)
        return isSelect
    }

    return (
        <div className={`w-full h-full bg-[#020202b0] animate__animated animate__backInRight absolute top-0 right-0 z-[62] ${showServiceSelect ? 'block' : 'hidden'}`}>

            <div className={`w-full md:w-[480px] p-8 pt-0 bg-white h-full absolute top-0 right-0 overflow-auto `}>
                <div className=' pt-4 bg-white h-[120px] border-b border-gray-300 '>
                    <div className=' flex items-center justify-between '>
                        <Button variant={'ghost'} onClick={() => setShowServiceSelect(false)} className=' top-5 left-5 '>
                            <MoveLeft className=' w-4 h-4 ' />
                        </Button>
                        <h2 className="text-2xl font-bold mb-4">Select services</h2>
                    </div>
                    <div className=" relative ">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 " />
                        <Input
                            type="text"
                            placeholder="Search by service name"
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            className="w-full pl-10 h-12 py-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                        />
                    </div>
                </div>
                <ScrollArea className="space-y-8 h-h-full-minus-120 ">
                    {isLoading ? (
                        <CircleLoading />
                    ) : allCategories && (
                        allCategories?.map((category) => (
                            <div key={category.id} className=' space-y-2 '>
                                <h3 className="text-xl font-semibold ">
                                    {category.name} <span className="text-sm text-gray-500 font-normal">{category.services?.filter(ser => ser.type != "Package").length}</span>
                                </h3>
                                <div className="space-y-4">
                                    {category.services?.filter((ser) => ser.type != 'Package').map((service) => (
                                        <Button disabled={isSelected(service.id)} variant={'ghost'} onClick={() => addSelectService(service)} key={service.id} className={`flex relative items-center justify-between p-3 h-[70px] w-full ${isSelected(service.id) ? " bg-gray-100 " : ""} `}>
                                            <Badge variant="secondary" className={`text-green-600 bg-green-100 absolute top-0 right-0 ${isSelected(service.id) ? "block" : "hidden"} `}>selected</Badge>
                                            <span className="flex-1 text-start flex flex-col">
                                                <span className=" text-semibold ">{service.name}</span>
                                                <span className="text-sm text-gray-500">{secondToHour(service.duration, 'duration')}</span>
                                            </span>
                                            <span className="text-right font-medium ">{service.price} <span className=" text-xs ">MMK</span> </span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}

export default SelectServiceForPackage