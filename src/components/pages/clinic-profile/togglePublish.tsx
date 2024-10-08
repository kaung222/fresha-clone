'use client'
import { usePublishClinic } from '@/api/clinic/publish-clinic';
import { useUnPublicClinic } from '@/api/clinic/unpublish-clinic';
import ConfirmDialog from '@/components/common/confirm-dialog';
import { Switch } from '@/components/ui/switch';
import React from 'react'

type Props = {
    clinicId: string;
    isPublished: boolean;
}

const TogglePublishClinic = ({ clinicId, isPublished }: Props) => {
    const { mutate: publishClinic } = usePublishClinic();
    const { mutate: unPublishClinic } = useUnPublicClinic();

    const togglePublish = () => {
        if (isPublished) {
            unPublishClinic({ id: clinicId })
        } else {
            publishClinic({ id: clinicId })
        }
    }
    return (
        <>
            <ConfirmDialog title="Sure?" description="do you want to change publish?" onConfirm={() => togglePublish()}>
                <div className=" cursor-pointer" >
                    <Switch
                        className=' pointer-events-none '

                        checked={isPublished}
                    />
                </div>
            </ConfirmDialog>
        </>
    )
}

export default TogglePublishClinic