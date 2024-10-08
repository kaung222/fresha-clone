'use client'
import { useReplyComment } from '@/api/comment/reply/post-reply'
import SendIcon from '@/components/icons/SendIcon'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    id: string;
}

const ReplyForm = ({ id }: Props) => {
    const [text, setText] = useState('');
    const { mutate } = useReplyComment();

    const replyComment = () => {
        const payload = {
            id: id,
            content: text,
            type: 'text'
        }
        mutate(payload);
        setText('')
    }


    return (
        <>
            <CardFooter className="p-4">
                <div className="flex w-full space-x-2">
                    <Input
                        placeholder="Write a reply..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key == 'Enter') {
                                replyComment()
                            }
                        }}
                        className="flex-grow"
                    />
                    <Button onClick={() => replyComment}>
                        <Send className="w-4 h-4 mr-2" />
                        Send
                    </Button>
                </div>
            </CardFooter>
        </>
    )
}

export default ReplyForm