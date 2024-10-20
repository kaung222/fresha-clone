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
        <div className=' z-[90] animate__animated animate__backInRight h-screen overflow-y-auto w-screen fixed top-0 right-0 flex justify-end  '>
            <div className=' w-[72px] p-3 '>
                <Button className=' size-12 flex justify-center items-center rounded-full ' variant='outline' onClick={handleOpenChange}>X</Button>
            </div>
            <div className="bg-white border border-[#E5E5E5] max-w-[90%] shadow-dialog ">
                {children}
            </div>
        </div>
    )
}

export default Modal