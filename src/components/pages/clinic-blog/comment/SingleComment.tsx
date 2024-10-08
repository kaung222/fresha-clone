"use client";
import { Comment } from "@/types/comment";
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Flag, MessageCircle, MoreVertical, Send, ThumbsUp } from "lucide-react";
import { shortName } from "@/lib/utils";
import MenuDropdown from "./common/MenuDropdown";
import ReplyList from "./ReplyList";
import ReplyForm from "./ReplyForm";

type Props = {
    comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
    const [reply, setReply] = useState(false);
    const toggleReply = () => {
        setReply(!reply);
    };

    return (
        <>


            <Card className={`mb-4 `}>
                <CardHeader className="flex flex-row justify-between items-start space-x-4 p-4">
                    <div className="flex flex-row items-center space-x-4 ">

                        <Avatar>
                            <AvatarImage src={comment.user?.profilePicture || comment.clinic?.profilePictureUrl} alt={comment.user?.username || comment.clinic?.name} />
                            <AvatarFallback>{shortName(comment.user?.username || comment.clinic?.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{comment.user?.username || comment.clinic?.name}</p>
                            <p className="text-sm text-gray-500">{formatDistance(new Date(), comment.createdAt)}</p>
                        </div>

                    </div>

                    <MenuDropdown id={comment.id} type="comment" user={comment.user} />

                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p>{comment.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                    <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" onClick={() => toggleReply()}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Reply {comment.replyCount > 0 && `(${comment.replyCount})`}
                        </Button>
                        {/* <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(comment.id)}
                        className={comment.liked ? "text-primary" : ""}
                    >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Like {comment.likeCount > 0 && `(${comment.likeCount})`}
                    </Button> */}
                    </div>

                </CardFooter>
                {reply && (
                    <>
                        <ReplyList id={comment.id} />

                        <ReplyForm id={comment.id} />
                    </>
                )}
            </Card>


        </>
    );
};

export default SingleComment;