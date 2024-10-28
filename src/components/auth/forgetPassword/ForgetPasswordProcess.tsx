'use client'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'
import SuccessMessage from './success-reset'
import PasswordReset from './reset-password-form'
import ConfirmOtpForForgetPassword from './confirm-otp'
import EmailSelectForPassword from './email-select'

type Props = {}

const ForgetPasswordProcess = (props: Props) => {
    const { setQuery, getQuery } = useSetUrlParams();
    const step = getQuery('step');

    // email-select, otp-confirm, new-password,success;

    return (
        <>
            {step == 'success' ? (
                <SuccessMessage />
            ) : step == "new-password" ? (
                <PasswordReset />
            ) : step == "otp-confirm" ? (
                <ConfirmOtpForForgetPassword />
            ) : (
                <EmailSelectForPassword />
            )}
        </>
    )
}

export default ForgetPasswordProcess