'use client'
import { GetAllCategories } from '@/api/services/categories/get-all-categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Service } from '@/types/service';
import { MoveLeft } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    setShowServiceSelect: Dispatch<SetStateAction<boolean>>;
    showServiceSelect: boolean;
    addSelectService: (service: Service) => void

}

const SelectServiceForAppointment = ({ setShowServiceSelect, showServiceSelect, addSelectService }: Props) => {
    const [serviceSearch, setServiceSearch] = useState('');
    const { data: allCategories } = GetAllCategories();

    return (
        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className={` w-[480px] p-8 pt-0 bg-white h-full overflow-y-auto absolute top-0 right-0 ${showServiceSelect ? 'block' : 'hidden'}`}>

            <div className=' py-4 bg-white sticky top-0 border-b border-gray-300 '>
                <div className=' flex items-center justify-between '>
                    <h2 className="text-2xl font-bold mb-4">Select a service</h2>
                    <Button variant={'outline'} onClick={() => setShowServiceSelect(false)} className=' top-5 left-5 '>
                        <MoveLeft className=' w-4 h-4 ' />
                    </Button>
                </div>
                <div className=" ">
                    <Input
                        type="text"
                        placeholder="Search by service name"
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full h-12 px-4 py-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                    />
                </div>
            </div>
            <div className="space-y-8 mt-4">
                {allCategories?.map((category) => (
                    <div key={category.id} className=' space-y-6 '>
                        <h3 className="text-xl font-semibold ">
                            {category.name} <span className="text-sm text-gray-500 font-normal">{category.services?.length}</span>
                        </h3>
                        <div className="space-y-4">
                            {category.services?.map((service) => (
                                <Button variant={'ghost'} onClick={() => addSelectService(service)} key={service.name} className="flex items-center justify-between p-3 h-[70px] w-full ">
                                    <span className="flex-1 text-start flex flex-col">
                                        <span>{service.name}</span>
                                        <span className="text-sm text-gray-500">{service.duration}</span>
                                    </span>
                                    <span className="text-right">{service.price}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectServiceForAppointment