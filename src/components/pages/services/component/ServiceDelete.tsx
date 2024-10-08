'use client';
import { useDeleteService } from '@/api/service/delete-service';
import ConfirmDialog from '@/components/common/confirm-dialog';
import React from 'react'

type Props = {
    id: string
}

const ServiceDelete = ({ id }: Props) => {
    const { mutate } = useDeleteService();

    return (
        <>
            <ConfirmDialog title="Are you sure to delete doctor?" description="You won't get back doctor data after delete" onConfirm={() => mutate({ id: id })}>
                <div className=" text-red-600">Delete</div>
            </ConfirmDialog>
        </>
    )
}

export default ServiceDelete;