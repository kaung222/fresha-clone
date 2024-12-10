'use client'
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { MutableRefObject, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Card } from '../ui/card';

type SectionDataType = {
    id: string; // path and id of div
    name: string; // label
}

type Props = {
    title: string;
    handlerComponent: React.ReactNode;
    children: React.ReactNode;
    sectionData: SectionDataType[];
    editData?: any;
    drawers?: React.ReactNode;
    threshold?: number
}

const StepperScrollLayout = ({ title, handlerComponent, children, sectionData, editData, drawers, threshold = 0.5 }: Props) => {
    const [activeSection, setActiveSection] = useState<string>('');


    useEffect(() => {

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: threshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            })
        }, options);
        sectionData.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionData.forEach((section) => {
                const element = document.getElementById(section.id)
                if (element) {
                    observer.unobserve(element);
                }
            })
        }

    }, [sectionData, editData, threshold]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    };

    return (
        <div className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white  ">
            <div className="flex justify-between items-center w-full h-[80px] border-b bg-white border-gray-200 px-3 md:px-10 ">
                <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold">{title}</h1>
                {handlerComponent}
            </div>

            <div className=' h-h-full-minus-80 w-full ' >

                <div className=" flex gap-5 p-3 lg:hidden top-0 z-[55] bg-[#ffffffb2] md:px-10 overflow-x-auto ">
                    {sectionData.map((section) => (
                        <Button key={section.id} variant={section.id == activeSection ? 'default' : 'outline'} className={`duration-300 ${section.id == activeSection ? " bg-brandColor hover:bg-brandColor/90 " : ""}`} onClick={() => scrollToSection(section.id)} >{section.name}</Button>
                    ))}
                </div>
                <div className=' flex gap-20 w-full h-full px-3 md:px-10 md:pb-0 lg:pt-10 '>
                    <Card style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className=' overflow-auto flex-1 h-full w-full max-w-[886px] p-5 pb-10 '>
                        {children}
                    </Card>

                    <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 hidden lg:flex flex-col gap-5 h-full overflow-auto ">
                        <div className="flex-grow relative flex flex-col ">
                            {sectionData.map((data, index) => (
                                <div key={index} className={`${index == 0 ? " " : "flex-grow"} relative flex flex-col justify-end`}>
                                    <div onClick={() => {
                                        scrollToSection(data.id)
                                        setActiveSection(data.id)
                                    }} className={`flex cursor-pointer items-center `}>
                                        <div className={`w-8 h-8  text-gray-500 duration-300 ${(data.id == activeSection) ? "bg-brandColor text-white " : " bg-gray-100 "}  rounded-full flex items-center justify-center mr-4`}>{index + 1}</div>
                                        <span className={`  ${(data.id == activeSection ? " font-medium text-black " : 'text-gray-500')} duration-300 `} >{data.name}</span>
                                    </div>
                                    {index != 0 && (
                                        <div className=' h-full bg-brandColorLight w-1 absolute -top-1 left-[15px]  z-[-20] '></div>
                                    )}
                                </div>
                            ))}

                        </div>
                        <div className=" h-5"></div>
                    </div>
                </div>

            </div>

            {drawers}
        </div>
    )
}

export default StepperScrollLayout