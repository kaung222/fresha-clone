import React from 'react'

type Props = {}

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' px-[15px] max-w-[1140px] mx-auto '>{children}

        </div>
    )
}

export default Container