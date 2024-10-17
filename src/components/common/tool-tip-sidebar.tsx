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
    title: string;

}

const ToolTipSidebar = ({ children, title }: Props) => {
    const router = useRouter()
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100} >
                <TooltipTrigger className='' asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side='right' align='start' >
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToolTipSidebar
