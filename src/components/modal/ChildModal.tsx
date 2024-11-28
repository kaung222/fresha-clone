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
import { ArrowLeft } from 'lucide-react';


type Props = {
    children: React.ReactNode;
    onClose: () => void;
    onBack: () => void;
    avatar?: React.ReactNode;
}

const ChildModal = ({ children, onClose, onBack, avatar }: Props) => {
    const router = useRouter();
    const { setQuery, deleteQuery } = useSetUrlParams()
    const handleOpenChange = () => {
        onClose()
    }
    const handleBackChange = () => {
        onBack()
    }
    return (
        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=' z-[60] animate__animated animate__backInRight h-screen w-screen fixed bg-white top-0 left-0 overflow-y-auto space-y-3 '>
            <div className=' w-full h-[70px] px-3 sticky z-[20] top-0 flex justify-between items-center gap-6 bg-white border-b border-gray-300 '>
                <Button className='' variant='ghost' onClick={handleBackChange}>
                    <ArrowLeft className=' w-5 h-5 text-black ' />
                </Button>
                <div className=' flex-grow '>
                    {avatar}
                </div>
                <Button className=' size-8 lg:size-12 flex justify-center items-center rounded-full ' variant='outline' onClick={handleOpenChange}>X</Button>
            </div>
            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" border border-[#E5E5E5] w-full px-3 ">
                {children}
            </div>
        </div>
    )
}

export default ChildModal