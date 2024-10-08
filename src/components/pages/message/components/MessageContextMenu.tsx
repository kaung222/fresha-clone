'use client'
import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import ConfirmDialog from '@/components/common/confirm-dialog';
import { useDeleteMessage } from '@/api/conversation/delete-message';

type Props = {
    children: React.ReactNode;
    id: string;
}

const MessageContextMenu = ({ children, id }: Props) => {
    const { mutate } = useDeleteMessage();
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem className=' cursor-pointer  '>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem className=' '>
                    <div onClick={(e) => e.stopPropagation()}>

                        <ConfirmDialog title='Are You Sure to Delete Message?' description='' onConfirm={() => mutate(id)}>
                            <div className="text-delete text-sm">Delete Message</div>
                        </ConfirmDialog>
                    </div>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default MessageContextMenu