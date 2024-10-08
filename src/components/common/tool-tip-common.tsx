import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    children: React.ReactNode;
    title: string;
}

const ToolTipCommon = ({ children, title }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={(e) => {
                    e.preventDefault();
                }} className='' asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToolTipCommon
