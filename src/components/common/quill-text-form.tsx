'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type QuillEditorPropType = {
    setContent: React.Dispatch<React.SetStateAction<string>>;
    initialContent?: string;
    placeholder?: string;
}


const QuillEditor = ({ setContent, initialContent = '', placeholder = 'Write something here...' }: QuillEditorPropType) => {
    const [value, setValue] = useState<string>(initialContent);

    const modules = {
        toolbar: [
            [{ 'header': [] }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ]
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ]


    const handleChange = (content: string) => {
        setValue(content);
        setContent(content)
    };

    return (
        <ReactQuill className=' min-h-[200px] ' modules={modules} formats={formats} value={value} onChange={handleChange} placeholder={placeholder} theme="snow" />

    );
};


export default QuillEditor;
