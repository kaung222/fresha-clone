'use client'
import { useLocalstorage } from '@/lib/helpers';
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type Props = {
    ownerId?: string;
}

const AvatarById = ({ ownerId }: Props) => {
    const { getData } = useLocalstorage();
    const clinic = getData('clinic');
    return (
        <div className=' flex gap-2 items-center '>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>

                <h3 className=' text-[12px] text-text '>{clinic.clinicName}</h3>
                <p className=" text-[11px] text-textLightest ">Published in <span>jun 27, 2024</span></p>
            </div>
        </div>
    )
}

export default AvatarById