'use client'
import QuillEditor from '@/components/common/quill-text-form'
import QuillTextForm from '@/components/common/quill-text-form'
import { BlogCreate } from '@/components/pages/clinic-blog'
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {


    return (
        <div>
            <BlogCreate />


        </div>
    )
}

export default page