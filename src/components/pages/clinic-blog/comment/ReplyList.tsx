"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";
import { useGetReply } from "@/api/comment/reply/get-all-reply";
import MenuDropdown from "./common/MenuDropdown";

type Props = {
    id: string;
};

const ReplyList = ({ id }: Props) => {
    const { data } = useGetReply(id);

    return (
        <>
            {data?.map((reply) => (
                <Card key={reply.id} className={`ml-12 mb-4 `}>
                    <CardHeader className="flex flex-row items-start justify-between space-x-4 p-4">
                        <div className=" flex flex-row items-center space-x-4">

                            <Avatar>
                                <AvatarImage src={reply.user?.profilePicture} alt={reply.user?.username} />
                                <AvatarFallback>{reply.user?.username[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{reply.user?.username}</p>
                                <p className="text-sm text-gray-500">{formatDistance(new Date(), reply.createdAt)}</p>
                            </div>
                        </div>

                        <MenuDropdown id={reply.id} type="reply" user={reply.user} />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p>{reply.content}</p>
                    </CardContent>

                </Card>
            ))}
        </>
    );
};


export default ReplyList;