import Image from 'next/image'
import React from 'react'

type Props = {}

const LogoWithBrand = (props: Props) => {
    return (
        <div className=' h-10 w-[180px] flex space-x-[10px] '>
            <Image src={`/img/user_heart.png`} alt='logo' width={40} height={40} className=' size-10' />
            <div>
                <h2 className=' font-bold text-[20px] leading-tight tracking-tight '>MedService</h2>
                <p className=' text-[9px] '>HEALTHCARE MYANMAR</p>
            </div>
        </div>
    )
}

export default LogoWithBrand