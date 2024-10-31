import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { redirect, useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    trigger: React.ReactNode;

}

const TooltipApp = ({ children, trigger }: Props) => {
    const router = useRouter()
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100} >
                <TooltipTrigger className='' asChild>
                    {trigger}
                </TooltipTrigger>
                <TooltipContent className=' p-0' >
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipApp
