import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className=" p-10 pb-5 w-full h-full ">
            {children}
        </div>
    )
}

export default Layout