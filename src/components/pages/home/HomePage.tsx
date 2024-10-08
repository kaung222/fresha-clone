import React from 'react'
import { AllInOneSection, HeroSection, Profession, ServiceList, ServiceSection } from './sections'

type Props = {}

const HomePage = (props: Props) => {
    return (
        <div className=' w-full relative h-full '>
            <HeroSection />
            <ServiceSection />
            <AllInOneSection />
            <Profession />
            <ServiceList />
        </div>
    )
}

export default HomePage