import DetailPaymentDrawer from '@/components/dashboard/sales/payments/drawer/detail-drawer'
import EditPaymentDetails from '@/components/dashboard/sales/payments/drawer/edit-drawer'
import PaymentTransactions from '@/components/dashboard/sales/payments/PaymentTransactionList'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const Page = (props: Props) => {

    return (
        <>
            <PaymentTransactions />

        </>
    )
}

export default Page