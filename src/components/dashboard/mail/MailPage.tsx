'use client'
import { useGetMail } from '@/api/mail/get-mail'
import React from 'react'
import MailCard from './MailCard'
import PageLoading from '@/components/common/page-loading'
import { Button } from '@/components/ui/button'

type Props = {}

const MailPage = (props: Props) => {
    const { data: allMail, isLoading } = useGetMail();
    return (
        <>
            <div className="p-3 md:p-10">
                <div className=' flex justify-between items-center '>
                    <h1 className="text-2xl font-bold mb-6">Mail List</h1>
                    {/* <Button variant={'brandOutline'} className=' '>
                        Create
                    </Button> */}
                </div>
                <div className="space-y-4">
                    {isLoading ? (
                        <PageLoading />
                    ) : allMail && (
                        allMail.data?.map((mail) => (
                            <MailCard key={mail.id} mail={mail} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default MailPage