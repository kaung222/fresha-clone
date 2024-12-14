'use client'
import React from 'react'
import { format } from 'date-fns'
import { Mail as MailIcon, User, Calendar, Trash } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mail } from '@/types/mail'
import { Button } from '@/components/ui/button'
import { useDeleteMail } from '@/api/mail/delete-mail'
import ConfirmDialog from '@/components/common/confirm-dialog'


type Props = {
    mail: Mail;
}

const MailCard = ({ mail }: Props) => {
    const { mutate: deleteMail, isPending } = useDeleteMail()
    const initials = mail.recipientName.split(' ').map(n => n[0]).join('').toUpperCase()
    const truncatedSubject = mail.subject.length > 50 ? `${mail.subject.substring(0, 50)}...` : mail.subject
    const truncatedText = mail.text.length > 100 ? `${mail.text.substring(0, 100)}...` : mail.text

    return (
        <>
            <Card className="mb-4 hover:shadow-md transition-shadow group">
                <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12 bg-[#FF66A1] text-white">
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-semibold truncate">{mail.recipientName}</h3>
                                <div className=' flex items-center gap-2 '>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(mail.createdAt), 'MMM d, yyyy')}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{format(new Date(mail.createdAt), 'PPpp')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <ConfirmDialog title='Are you sure to delete this mail?' description='' onConfirm={() => deleteMail({ id: mail.id })}>
                                        <Button variant={'ghost'} className=' hidden group-hover:block text-delete h-6 w-6 p-1 '>
                                            <Trash className=' w-4 h-4 ' />
                                        </Button>
                                    </ConfirmDialog>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">{truncatedSubject}</p>
                            <p className="text-sm text-gray-600 mb-2">{truncatedText}</p>
                            <div className="flex flex-col sm:flex-row justify-start items-start gap-2 sm:gap-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                    <MailIcon className="h-4 w-4 mr-1 text-[#FF66A1]" />
                                    <span>{mail.to[0]}</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1 text-[#FF66A1]" />
                                    <span>{mail.recipientName}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-[#FF66A1]" />
                                    <span>{format(new Date(mail.createdAt), 'MMM d, yyyy')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default MailCard