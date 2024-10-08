'use client'
import { usePublishDoctor } from '@/api/doctor/publish-doctor';
import { useUnpublishDoctor } from '@/api/doctor/unpublish-doctor';
import ConfirmDialog from '@/components/common/confirm-dialog';
import { Switch } from '@/components/ui/switch';
import React from 'react'

type Props = {
    doctorId: string;
    isPublished: boolean;
}

const DoctorPublish = ({ doctorId, isPublished }: Props) => {
    const { mutate: publish } = usePublishDoctor();
    const { mutate: unPublish } = useUnpublishDoctor();

    const togglePublish = () => {
        if (isPublished) {
            unPublish({ id: doctorId })
        } else {
            publish({ id: doctorId })
        }
    }
    return (
        <>
            <ConfirmDialog title="Sure?" description="do you want to change publish?" onConfirm={() => togglePublish()}>
                <div>
                    <Switch
                        checked={isPublished}
                    />
                </div>
            </ConfirmDialog>
        </>
    )
}

export default DoctorPublish