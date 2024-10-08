"use client";
import { useGetPostsByClinic } from "@/api/post/get-posts";
import IconAngle from "@/components/icons/IconAngle";
import Link from "next/link";
import BlogCard from "./blog-card";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import Loading from "@/components/common/loading";
import EmptyData from "@/components/common/empty-data";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, PenSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CircleLoading from "@/components/layout/circle-loading";
import ErrorPage from "@/components/layout/DataErrorPage";

const BlogList = () => {
  const { data, isLoading } = useGetPostsByClinic();
  console.log(data);

  return (
    <div>
      <div className=" flex  justify-between items-center ">
        <div className=" px-[12px] ">
          <AppBreadcrumb title="Blogs" page="Posts" />
        </div>

        {/* right  */}
        <div className=" mt-0 lg:mt-6 px-[12px] ">
          <div className=" w-[110px] h-[53.5px]  ">
            <Link
              href="/blogs/create"
              className=" w-full px-5 py-2 border-[0.8px] flex bg-button hover:bg-button/90 border-button rounded-[5px] text-white font-[400] text-[15px] leading-[22.5px] text-center "
            >
              <PenSquare className="mr-2 h-6 w-6" /> Create
            </Link>
          </div>
        </div>
      </div>

      {/* lists  */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {/* list  */}
        {isLoading ? (
          <div className=" col-span-3 ">
            <CircleLoading />
          </div>
        ) : data ? (
          <>
            {data.records?.length === 0 ? (
              <>
                <Card className="w-full max-w-2xl mx-auto col-span-1 sm:col-span-2 xl:col-span-3">
                  <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                    <h1 className="text-3xl font-bold">No Blog Posts Yet</h1>
                    <p className="text-gray-500 max-w-md">
                      It looks like there aren&apos;t any blog posts available
                      at the moment. Check back later for new content or create
                      your first post!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" /> Refresh Page
                      </Button>
                      <Button>
                        <PenSquare className="mr-2 h-4 w-4" /> Create New Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              data.records.map((post) => <BlogCard key={post.id} post={post} />)
            )}
          </>
        ) : (
          <ErrorPage />
        )}
        {/* {data?.records.map((post) => {
          return <BlogCard post={post} key={post.id} />;
        })} */}
      </div>
    </div>
  );
};

export default BlogList;
