"use client";
import { useCommentPost } from "@/api/comment/comment-post";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import FormTextarea from "@/components/common/FormTextarea";
import SingleComment from "./SingleComment";
import { useGetAllComments } from "@/api/comment/get-comments";

type Props = {
    id: string;
};

const CommentList = ({ id }: Props) => {
    const { mutate } = useCommentPost();
    const { data } = useGetAllComments();
    const form = useForm();
    const sendComment = (value: any) => {
        const payload = {
            content: value.comment,
            type: "text",
        };
        mutate(payload, {
            onSuccess: () => {
                form.setValue('comment', '')
            }
        });
    };

    return (
        <>
            <div className="max-w-3xl mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <Card className="mb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(sendComment)}>

                            <CardContent className="p-4">
                                <FormTextarea
                                    form={form}
                                    name="comment"
                                    placeholder="Write a comment"
                                />

                                <Button type="submit">Post Comment</Button>
                            </CardContent>
                        </form>
                    </Form>
                </Card>
                <div className="space-y-4">
                    {data && (
                        data.pages.map((page) => page.records.map((comment) => (
                            <SingleComment key={comment.id} comment={comment} />
                        )))
                    )}
                    {/* {comments.map(comment => (
                  <div key={comment.id}>
                      <CommentComponent comment={comment} />
                      {comment.replies.map(reply => (
                          <CommentComponent key={reply.id} comment={reply} isReply />
                      ))}
                  </div>
              ))} */}
                </div>
            </div>
        </>
    );
};

export default CommentList;