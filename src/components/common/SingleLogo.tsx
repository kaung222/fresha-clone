import Image from 'next/image'
import React from 'react'

type Props = {}

const SingleLogo = (props: Props) => {
    return (
        <div className=' size-10 '>
            <Image src={`/img/bera.png`} alt='logo' width={40} height={40} className=' size-10' />
        </div>
    )
}

export default SingleLogo