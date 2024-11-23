import DailySalesSummary from '@/components/dashboard/sales/daily-sales/DailySalesSummary'
import PaymentTransactions from '@/components/dashboard/payments/PaymentTransactionList'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    redirect('/sales/daily-sales')
    return (
        <>
            <PaymentTransactions />
        </>
    )
}

export default page