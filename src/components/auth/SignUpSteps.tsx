'use client'
import React, { useState } from 'react'
import RequestOtp from './request-otp';
import ConfirmOtp from './confirm-otp';
import ClinicRegister from './register';

type Props = {}

const SignUpSteps = (props: Props) => {
    const [step, setStep] = useState('1');

    return (
        <>
            {step == '1' && <RequestOtp nextStep={setStep} />}
            {step == '2' && <ConfirmOtp nextStep={setStep} />}
            {step == '3' && <ClinicRegister />}
        </>
    )
}

export default SignUpSteps