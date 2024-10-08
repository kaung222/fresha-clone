'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Delete, Flag, MoreVertical } from 'lucide-react';
import { useDeleteComment } from '@/api/comment/delete-comment';
import { User } from '@/types/user';
import { useDeleteReply } from '@/api/comment/reply/delete-reply';


type Props = {
    id: string;
    type: "comment" | "reply";
    user?: User;
}

const MenuDropdown = ({ id, type }: Props) => {
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: deleteReply } = useDeleteReply();

    const handleDelete = () => {
        if (type == "comment") {
            deleteComment(id)
        }
        if (type == "reply") {
            deleteReply(id)
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className=' text-delete' onClick={handleDelete}>
                        <Delete className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default MenuDropdown