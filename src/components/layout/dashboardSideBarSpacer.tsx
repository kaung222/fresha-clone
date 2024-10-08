import React from 'react'

type Props = {
    open: boolean
}

const DashboardSideBarSpacer = (props: Props) => {
    const { open } = props;
    return (
        <div className='  '>
            <div className={` duration-500 ${open ? " w-0 md:w-[300px] lg:w-0 " : "w-0 lg:w-[300px] "}`}></div>
        </div>
    )
}

export default DashboardSideBarSpacer