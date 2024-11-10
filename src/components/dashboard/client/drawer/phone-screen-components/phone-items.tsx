'use client'
import ChildModal from '@/components/modal/ChildModal'
import React from 'react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import Review from '../drawer-components/Review'
import Items from '../drawer-components/Items'

type Props = {}

const PhoneItems = (props: Props) => {
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
            <Items />
        </ChildModal>
    )
}

export default PhoneItems