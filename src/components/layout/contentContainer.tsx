import React from 'react'

type Props = {}

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' w-full h-full '>
            <div className=' mx-auto h-full px-[15px] w-full max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] '>{children}</div>
        </div>
    )
}

export default ContentContainer