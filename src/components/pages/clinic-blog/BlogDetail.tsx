"use client";
import { useDeletePost } from "@/api/post/delete-post";
import { useGetPostDetails } from "@/api/post/get-post-detail";
import { usePublishPost } from "@/api/post/publish-post";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import EditDeleteBar from "@/components/common/edit-delete-bar";
import BlogLike from "./BlogLike";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";
import { blogFakeImage, clinicFakeImage } from "@/lib/data/placeholderImages";
import { dateFormat, shortName } from "@/lib/utils";
import CommentList from "./comment/CommentList";
import ContentContainer from "@/components/layout/contentContainer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle } from "lucide-react";
import ErrorPage from "@/components/layout/DataErrorPage";
import CircleLoading from "@/components/layout/circle-loading";

type Props = {};

const BlogDetail = (props: Props) => {
  const { data: blog, isLoading } = useGetPostDetails();
  const publishPost = usePublishPost();
  const { mutate } = useDeletePost();
  const handleDeletePost = () => {
    if (blog) {
      mutate({ id: blog.id });
    }
  };

  const handlePublish = (id: string) => {
    publishPost.mutate({ id });
  };

  const ImageGallery = ({ images }: { images: string[] }) => {
    if (images?.length === 1) {
      return (
        <Image
          src={images[0]}
          alt="Blog post image"
          width={1200}
          height={600}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
        />
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Blog post image ${index + 1}`}
            width={600}
            height={300}
            className={`w-full ${images.length === 3 && index === 2 ? "col-span-2" : ""
              } h-[150px] md:h-[200px] object-cover rounded-lg`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div>
          <CircleLoading />
        </div>
      ) : blog ? (
        <>
          <div>
            <div className=" flex justify-between items-end  ">
              <div>
                <AppBreadcrumb
                  data={[{ name: "blogs", link: "/blogs" }]}
                  title="Blog Detail"
                  page={blog.title}
                />
              </div>

              <div className=" ml-auto cursor-pointer  ">
                <EditDeleteBar
                  edit={`/blogs/${blog.id}/edit`}
                  handleDelete={handleDeletePost}
                />
              </div>
            </div>




            <ContentContainer>
              <div className="container mx-auto px-4 py-8">
                <article className="max-w-3xl mx-auto">
                  <header className="mb-8">
                    {blog.images && <ImageGallery images={blog.images} />}
                    <h1 className="text-3xl md:text-4xl font-bold my-4">
                      {blog.title}
                    </h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={blog.clinic?.profilePictureUrl || clinicFakeImage} alt={blog.clinic?.name} />
                        <AvatarFallback>{shortName(blog.clinic?.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{blog?.clinic?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistance(new Date(), blog.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog?.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </header>

                  <div
                    className="prose max-w-none mb-8 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <footer className="mb-8">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <BlogLike />
                        {/* comment icon  */}
                        <div className=" flex gap-1">
                          <MessageCircle className="w-5 h-5" />
                          <span>{blog.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </footer>

                  <Separator className="my-8" />

                  <CommentList id={blog.id} />


                </article>
              </div>
            </ContentContainer>




          </div>
        </>
      ) : (
        <ErrorPage />
      )}

    </>
  );
};

export default BlogDetail;
