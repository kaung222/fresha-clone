import Image from 'next/image'
import React from 'react'

type Props = {}

const LogoWithBrand = (props: Props) => {
    return (
        <div className=' h-10 w-[180px] flex items-center space-x-[10px] '>
            <Image src={`/img/bera.png`} alt='logo' width={40} height={40} className=' size-10' />
            <div>
                <h2 className=' font-bold text-xl leading-tight tracking-tight text-brandColor '>Baranie</h2>
            </div>
        </div>
    )
}

export default LogoWithBrand