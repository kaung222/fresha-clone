'use client'
import { UploadImage } from '@/api/commons/upload-image'
import { useSendMessage } from '@/api/conversation/send-message'
import { ConversationDetailResponse } from '@/api/conversation/user-conversation'
import ImageIcon from '@/components/icons/ImageIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalstorage } from '@/lib/helpers'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Send } from 'lucide-react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
    setImage: Dispatch<SetStateAction<string | undefined>>;
    socket: Socket | null;
    conversationData: ConversationDetailResponse | undefined;

}

const MessageInput = ({ setImage, socket, conversationData }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputMessage, setInputMessage] = useState('');
    const { mutate } = useSendMessage();
    const { getQuery } = useSetUrlParams();
    const { getData } = useLocalstorage();
    const clinic = getData('clinic');
    const conversationId = String(conversationData?._doc._id);
    const payload = {
        content: inputMessage,
        senderId: clinic?.id,
        conversationId,
        type: 'text',
    }
    const handleSendMessage = () => {
        mutate(payload);
        setInputMessage('');
    };

    const postImage = async (image: Blob): Promise<string> => {
        const { imageUrl } = await UploadImage(image);
        return imageUrl;
    };
    const handletyping = (data: { conversationId: string; username: string, status: boolean }) => {
        socket?.emit("typing", data);
    };

    return (
        <>
            <div className="bg-white border-t p-4">
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                            e.key === 'Enter' && handleSendMessage()
                            handletyping({ conversationId, username: clinic.name, status: true })

                        }}
                        onKeyUp={useDebouncedCallback((e) => {
                            handletyping({ conversationId, username: clinic.name, status: false })
                        }, 4000)}
                    />

                    <Input
                        ref={fileInputRef}
                        id="imageFile"
                        type="file"
                        onChange={async (e) => {
                            if (e.target.files) {
                                const imageUrl = await postImage(e.target.files[0]);
                                setImage(imageUrl)
                            }
                        }}
                        className="border-gray-300 hidden border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 font-normal text-sm"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} >
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default MessageInput