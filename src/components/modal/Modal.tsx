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


type Props = {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: Props) => {
    const router = useRouter();
    const { setQuery, deleteQuery } = useSetUrlParams()
    const handleOpenChange = () => {
        onClose()
    }
    return (
        <div className=' z-[50]  h-screen w-screen fixed top-0 right-0 flex justify-end bg-[#14141491] '>
            <div className=' w-[40px] lg:w-[72px] h-[40px] z-[52] lg:h-auto p-1 lg:p-3  absolute lg:relative top-0 right-0 '>
                <Button className=' size-8 lg:size-12 flex justify-center items-center rounded-full ' variant='outline' onClick={handleOpenChange}>X</Button>
            </div>
            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="bg-white animate__animated animate__backInRight border border-[#E5E5E5] lg:max-w-[90%] lg:min-w-[600px] w-full  shadow-dialog h-full overflow-y-auto ">
                {children}
            </div>
        </div>
    )
}

export default Modal