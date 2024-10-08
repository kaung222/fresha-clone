// 'use client'
// import { useCommentPost } from '@/api/comment/comment-post'
// import { useGetAllComments } from '@/api/comment/get-comments'
// import FormInput from '@/components/common/FormInput'
// import SendIcon from '@/components/icons/SendIcon'
// import { Button } from '@/components/ui/button'
// import { Form } from '@/components/ui/form'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import { useForm } from 'react-hook-form'

// type Props = {
//     id: string
// }

// const BlogComment = ({ id }: Props) => {
//     const { mutate } = useCommentPost();
//     const { data } = useGetAllComments();
//     const form = useForm();
//     const sendComment = (value: any) => {
//         const payload = {
//             content: value.comment,
//             type: "text",
//         }
//         mutate(payload);
//     }


//     return (
//         <div>
//             <h3 className='font-[600] text-[18px] leading-[27px] text-textDart dark:text-gray-100 mt-6'>Comments :</h3>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(sendComment)} action="" className=' relative flex items-end'>
//                     <div className=' w-full flex-grow'>
//                         <FormInput
//                             form={form}
//                             label='comment your option'
//                             name='comment'
//                             placeholder='what do you think?..'
//                         />
//                     </div>
//                     <Button className=' mb-[9px] -ms-1 '>
//                         <SendIcon className=' size-6 ' />
//                     </Button>
//                 </form>

//             </Form>
//             {/* comment  */}
//             {data && data.pages.map((page) => page.records.map((comment) => (

//                 <div key={comment.id}>
//                     {/* each comment  */}
//                     <div className="mt-6">
//                         <div className='flex justify-between items-center'>
//                             {/* left  */}
//                             <div className="flex items-center">
//                                 <Link href="" className='pr-4'>
//                                     <Image
//                                         src={`https://shreethemes.in/doctris/layouts/assets/images/client/01.jpg`}
//                                         alt=''
//                                         width={45}
//                                         height={45}
//                                         className='rounded-full w-[45px] h-[45px] overflow-hidden'
//                                         priority
//                                     />
//                                 </Link>
//                                 <div className="">
//                                     <h3 className='text-textDart dark:text-gray-100 font-[600] text-[15px] leading-[22.5px]'>Lorenzo Peterson</h3>
//                                     <small className="text-[13.5px] font-[400] leading-[20.5px] text-gray-500 dark:text-gray-400">15th August, 2019 at 01:25 pm</small>
//                                 </div>
//                             </div>

//                             {/* right  */}
//                             <Link href="" className='font-[400] text-[15px] leading-[22.5px] text-textLightest dark:text-gray-500'>Reply</Link>
//                         </div>
//                         <div className="mt-1">
//                             <p className='mb-4 p-4 text-text dark:text-gray-300 text-[15px] font-[400] leading-[24px]'>
//                                 {comment.content}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )))}
//         </div>
//     )
// }

// export default BlogComment