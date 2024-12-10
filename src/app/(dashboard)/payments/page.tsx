"use client"
import PaymentTransactions from '@/components/dashboard/payments/PaymentTransactionList'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { getQuery } = useSetUrlParams()
    const drawer = getQuery('drawer');
    return (
        <>
            <PaymentTransactions />

        </>
    )
}

export default Page