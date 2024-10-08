'use client'
import { GetConversationResponse } from '@/api/conversation/get-conversations'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Conversation } from '@/types/conversation'
import { InfiniteData } from '@tanstack/react-query'
import { Menu, PhoneCall, PhoneOff } from 'lucide-react'
import React from 'react'
import { CallStatus } from '../MainChatArea'
import { ConversationDetailResponse } from '@/api/conversation/user-conversation'

type Props = {
    activeUsers: string[];
    openCall: () => void;
    callStatus: CallStatus;
    toggleSidebar: () => void;
    conversationData: ConversationDetailResponse | undefined;
}


const ChatHeader = ({ openCall, activeUsers, callStatus, toggleSidebar, conversationData }: Props) => {
    const { getQuery } = useSetUrlParams();
    const chatId = getQuery('chat');
    const partner = conversationData?.user;
    const isUserOnline = activeUsers.includes(String(partner?.id));
    // console.log(isUserOnline, partner?.id, 'ac', activeUsers)


    return (
        <>


            <div className="bg-white border-b p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    {partner && (
                        <>

                            <div className="relative">
                                <Avatar>
                                    <AvatarImage src={partner?.profilePicture} />
                                    <AvatarFallback>{partner?.username.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span
                                    className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${isUserOnline ? 'bg-green-500' : 'bg-gray-300'
                                        } ring-2 ring-white`}
                                    aria-hidden="true"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{partner?.username}</h2>
                                <p className={`text-sm ${isUserOnline ? 'text-green-500' : 'text-gray-500'}`}>
                                    {isUserOnline ? 'Online' : 'Offline'}
                                </p>
                            </div>


                        </>
                    )}

                </div>
                <Button disabled={callStatus !== 'idle'} variant="outline" size="icon" onClick={openCall}>
                    <PhoneCall className="h-4 w-4" />
                </Button>
            </div >


        </>
    )
}

export default ChatHeader