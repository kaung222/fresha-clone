'use client'
import ChildModal from '@/components/modal/ChildModal'
import React from 'react'
import Sales from '../drawer-components/Sales'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'

type Props = {}

const PhoneSales = (props: Props) => {
    const { deleteQuery } = useSetUrlParams();
    const handleClose = () => {
        deleteQuery({ key: 'drawer-tab' });
        deleteQuery({ key: 'drawer' });
    }
    const handleBack = () => {
        deleteQuery({ key: 'drawer-tab' })
    }
    return (
        <ChildModal onClose={handleClose} onBack={handleBack}>
            <Sales />
        </ChildModal>
    )
}

export default PhoneSales