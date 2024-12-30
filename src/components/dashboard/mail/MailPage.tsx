'use client'
import { useGetMail } from '@/api/mail/get-mail'
import React from 'react'
import MailCard from './MailCard'
import PageLoading from '@/components/common/page-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Inbox } from 'lucide-react'
import Link from 'next/link'
import PaginationBar from '@/components/common/PaginationBar'

type Props = {}

const MailPage = (props: Props) => {
    const { data: allMail, isLoading } = useGetMail();
    return (
        <>
            <div className="p-3 md:p-10 bg-gradient-to-br from-white to-brandColorLight/50 ">
                <div className=' flex justify-between items-center mb-5'>
                    <h1 className="text-2xl font-bold mb-6 h-full flex items-center">Mail List</h1>
                    <Link href="/mail/create" className=' px-4 py-2 rounded-lg border border-brandColor text-brandColor bg-white hover:bg-brandColor hover:text-white '>
                        Create
                    </Link>
                </div>
                <div className="space-y-4">
                    {isLoading ? (
                        <PageLoading />
                    ) : allMail && allMail.records.length > 0 ? (
                        allMail.records?.map((mail) => (
                            <MailCard key={mail.id} mail={mail} />
                        ))
                    ) : (
                        <Card className="w-full">
                            <CardContent className="flex flex-col items-center justify-center p-12">
                                <Inbox className="h-24 w-24 text-[#FF66A1] mb-6" />
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your inbox is empty</h2>
                                <p className="text-gray-500 text-center max-w-sm">
                                    There are no emails in your inbox at the moment. New messages will appear here when they arrive.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <PaginationBar totalPages={allMail?._metadata.pageCount || 1} totalResult={allMail?._metadata.totalCount} />
            </div>
        </>
    )
}

export default MailPage