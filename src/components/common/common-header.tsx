import React from 'react'
import { LabelGuide } from '../dashboard/guide/label-guide';
import { CircleHelp } from 'lucide-react';

type Props = {
    title: string;
    para?: string;
    currentIndex?: number;
}

const CommonHeader = ({ title, para, currentIndex }: Props) => {
    return (
        // <div>
        //     <h2 className=" text-heading font-heading leading-heading ">{title}</h2>
        //     <p className=" font-textGray text-[14px] leading-[14px] text-zinc-500 ">{para}</p>
        // </div>
        <div>
            <div className=' inline-block relative '>
                <h1 className="text-2xl font-bold mb-2">{title}</h1>
                <div className=" absolute top-0 -right-5 ">
                    <LabelGuide currentIndex={currentIndex || 0}>
                        <CircleHelp className=' w-4 h-4 cursor-pointer ' />
                    </LabelGuide>
                </div>

            </div>
            <p className="text-gray-600 hidden lg:block">
                {para}
            </p>
        </div>
    )
}

export default CommonHeader