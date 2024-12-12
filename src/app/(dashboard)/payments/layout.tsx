import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className='px-3 md:px-10 md:pt-10 '>{children}</div>
    )
}

export default Layout