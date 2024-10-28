"use client"
import ConfirmOtp from '@/components/auth/register/otp-confirmation/confirm-otp'
import RequestOtp from '@/components/auth/register/otp-confirmation/email-otp-request'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const step = getQuery('step');
    return (
        <>
            {step == "confirm" ? (
                <ConfirmOtp />
            ) : (
                <RequestOtp />

            )}
        </>
    )
}

export default Page