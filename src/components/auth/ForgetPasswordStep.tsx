'use client'
import React, { useState } from 'react'
import RequestOtp from './request-otp';
import ForgetPasswordOtpForm from './forget-password-otp-request';
import ConfirmOtp from './confirm-otp';
import SetNewPassword from './set-new-password';

type Props = {}

const ForgetPasswordStep = (props: Props) => {
    const [step, setStep] = useState('1');

    return (
        <>
            {step == '1' && <ForgetPasswordOtpForm nextStep={setStep} />}
            {step == "2" && <ConfirmOtp nextStep={setStep} />}
            {step == "3" && <SetNewPassword nextStep={setStep} />}
        </>
    )
}

export default ForgetPasswordStep