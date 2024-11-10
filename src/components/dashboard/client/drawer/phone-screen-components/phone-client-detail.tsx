'use client'
import ChildModal from '@/components/modal/ChildModal'
import React from 'react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import Review from '../drawer-components/Review'
import ClientDetail from '../drawer-components/ClientDetail'
import { Client } from '@/types/client'

type Props = {
    client: Client
}

const PhoneClientDetail = ({ client }: Props) => {
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
            <ClientDetail client={client} />
        </ChildModal>
    )
}

export default PhoneClientDetail