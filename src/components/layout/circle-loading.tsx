import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const CircleLoading = (props: Props) => {
    return (
        <div className=" w-full h-full inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
                <p className="mt-2 text-lg font-semibold">Loading...</p>
            </div>
        </div>
    )
}

export default CircleLoading