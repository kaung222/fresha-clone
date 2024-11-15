import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className=' p-4 md:px-10 w-full h-full '>
            {children}
        </div>
    )
}

export default layout