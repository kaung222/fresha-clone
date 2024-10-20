'use client'
import React, { useState } from 'react'
import ServiceSelection from './offered-service'
import { Button } from '@/components/ui/button'
import BusinessSetUp from './business-data'
import TeamSizeSelection from './team-size'

type Props = {}

const BusinessRegister = (props: Props) => {
    const [stepper, setStepper] = useState(1);

    const nextStep = () => {
        setStepper(stepper + 1);
    }

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <BusinessSetUp />;
            case 2:
                return <ServiceSelection />;
            case 3:
                return <TeamSizeSelection />;
        }
    }

    return (
        <div className=" p-6">
            <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 ">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${(stepper - 1) * 33}%` }}></div>
                </div>
                <div className="flex justify-end items-center mb-4">
                    <Button onClick={() => nextStep()} className="ml-4 bg-black text-white hover:bg-gray-800">
                        Continue
                    </Button>
                </div>
            </div>

            <div className=" max-w-2xl mx-auto ">
                {renderStep(stepper)}
                {/* service  */}
            </div>
        </div>
    )
}

export default BusinessRegister