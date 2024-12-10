'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import 'animate.css';
import { X } from 'lucide-react';


type Props = {
    children: React.ReactNode;
    onClose: () => void;
    zIndex?: number
}

const Modal = ({ children, onClose, zIndex = 50 }: Props) => {
    const router = useRouter();
    const { setQuery, deleteQuery } = useSetUrlParams()
    const handleOpenChange = () => {
        onClose()
    }

    return (
        <div style={{ zIndex: `${zIndex}` }} className='   h-screen w-screen fixed top-0 right-0 flex justify-end bg-[#14141491] '>
            <div className=' w-[40px] lg:w-[72px] h-[40px] lg:h-auto p-1 lg:p-3  absolute lg:relative top-0 right-0 '>
                <Button className=' size-8 lg:size-12 relative block rounded-full px-2 lg:px-4 ' variant='outline' onClick={handleOpenChange}>
                    <X className=' w-4 h-4 text-black  ' />
                </Button>
            </div>
            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="bg-white animate__animated animate__backInRight border border-[#E5E5E5] lg:max-w-[80%] lg:min-w-[800px] w-full  shadow-dialog h-full overflow-hidden ">
                {children}
            </div>
        </div>
    )
}

export default Modal