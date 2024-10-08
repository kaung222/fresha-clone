'use client'
import { useDeletePost } from "@/api/post/delete-post";
import { Post } from "@/types/post";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import parse from "html-react-parser";
import { useLocalstorage } from "@/lib/helpers";
import { blogFakeImage } from "@/lib/data/placeholderImages";

const BlogCard = ({ post }: { post: Post }) => {
  const { mutate } = useDeletePost();
  const handleDeletePost = () => {
    mutate({ id: post.id });
  };
  const { getData, setData } = useLocalstorage()
  const clinic = getData('clinic');

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (

    <>
      <Card className="flex flex-col">
        <CardHeader className="p-0">
          <Image
            src={post.images ? post?.images[0] : blogFakeImage}
            alt={"post image"}
            width={500}
            height={400}
            className="w-full aspect-video object-cover object-center rounded-t-lg"

          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <div className="flex items-center space-x-4 mb-2">
            <Avatar>
              <AvatarImage src={clinic.profilePictureUrl} />
              <AvatarFallback>Cl</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{clinic.clinicName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 min-h-[56px] line-clamp-2 ">{post.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {parse(post.content)}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Link
            href={`/blogs/${post.id}`}
            className="text-primary hover:underline"
          >
            Read more
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {post.likeCount}
              </span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {post.commentCount}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BlogCard;

