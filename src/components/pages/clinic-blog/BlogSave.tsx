'use client'
import { useGetSavedPosts } from '@/api/save/get-saved-posts'
import { useRemoveSavedPost } from '@/api/save/remove-saved-post';
import { useSavePost } from '@/api/save/save-post';
import SaveOutlineIcon from '@/components/icons/saveOutlineIcon';
import SaveSolidIcon from '@/components/icons/saveSolidIcon';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React from 'react'

type Props = {
    isSaved: boolean;
}

const BlogSave = ({ isSaved }: Props) => {
    // const { data } = useGetSavedPosts();
    const { mutate: save } = useSavePost();
    const { mutate: removeSaved } = useRemoveSavedPost();

    return (

        <>


            <div className="flex items-center gap-2">
                {isSaved ? (
                    <Button onClick={() => removeSaved()} variant="ghost" size="icon">
                        <SaveSolidIcon className={`w-5 h-5 text-rose-500`} />
                        <span className="sr-only">unSave</span>
                    </Button>
                ) : (

                    <Button onClick={() => save()} variant="ghost" size="icon">
                        <SaveOutlineIcon className={`w-5 h-5 text-primary`} />
                        <span className="sr-only">save</span>
                    </Button>
                )}

            </div>


        </>
    )
}

export default BlogSave