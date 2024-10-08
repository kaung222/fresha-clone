'use client'
import { useGetPostDetails } from '@/api/post/get-post-detail';
import React from 'react'
import BlogEdit from './EditBlog';

type Props = {}

const EditBlogDataProvider = (props: Props) => {
    const { data } = useGetPostDetails();

    return (
        <>
            {data && <BlogEdit blog={data} />}
        </>
    )
}

export default EditBlogDataProvider