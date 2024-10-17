import React from 'react'

type Props = {
    title: string;
    para?: string;
}

const CommonHeader = ({ title, para }: Props) => {
    return (
        <div>
            <h2 className=" text-heading font-heading leading-heading ">{title}</h2>
            <p className=" font-textGray text-[14px] leading-[14px] text-zinc-500 ">{para}</p>
        </div>
    )
}

export default CommonHeader