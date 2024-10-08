'use client'
import { useGetAllLike } from "@/api/like/get-all-like";
import { useGiveLikeReact } from "@/api/like/post-like-react"
import { useRemoveLike } from "@/api/like/remove-Like";
import IconHeart from "@/components/icons/IconHeart";
import { Button } from "@/components/ui/button"
import { useLocalstorage } from "@/lib/helpers";
import { useAppSelector } from "@/store/hook";

export default function BlogLike() {
    const { getData } = useLocalstorage();
    const { data } = useGetAllLike();
    const clinicId = getData('clinic').id;
    return (
        <>
            {data && (

                <div className="flex items-center gap-2">
                    <Button className=" cursor-default " onClick={(e) => e.preventDefault()} variant="ghost" size="icon">
                        <IconHeart className={`w-5 h-5 text-rose-500`} />
                        <span className="sr-only">Like</span>
                    </Button>

                    <span className="text-sm font-medium text-primary">{data.length ? data.length : 0}</span>
                </div>
            )}
        </>
    )
}
