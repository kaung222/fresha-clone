"use client"
import DetailPaymentDrawer from '@/components/dashboard/sales/payments/drawer/detail-drawer'
import EditPaymentDetails from '@/components/dashboard/sales/payments/drawer/edit-drawer'
import PaymentTransactions from '@/components/dashboard/sales/payments/PaymentTransactionList'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { getQuery } = useSetUrlParams()
    const drawer = getQuery('drawer');
    return (
        <>
            <PaymentTransactions />
            {
                drawer == 'payment-detail' && (
                    <DetailPaymentDrawer />
                )
            }
            {
                drawer == 'payment-edit' && (
                    <EditPaymentDetails />
                )
            }
        </>
    )
}

export default Page