// 'use client'
// import React from 'react'
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel"
// import Autoplay from "embla-carousel-autoplay"
// import ContentContainer from '@/components/layout/contentContainer'
// import { useRouter } from 'next/navigation'

// type Props = {}

// const ImageCarousel = (props: Props) => {
//     const router = useRouter()
//     return (
//         <div className='h-full w-full relative '>

//             <Carousel opts={{
//                 align: "start",
//                 loop: true,
//             }} plugins={[
//                 Autoplay({
//                     delay: 5000,
//                 })
//             ]} className=" w-full h-full relative  overflow-hidden ">
//                 <CarouselContent className=' absolute w-full h-full ml-0  top-0 left-0'>
//                     <CarouselItem className=' w-full h-full pl-0 ' >
//                         <div className={` w-full h-full bg-[url("/img/family1.jpg")] bg-cover bg-center `}>

//                         </div>

//                     </CarouselItem>
//                     <CarouselItem className=' w-full h-full pl-0 ' >
//                         <div className={`w-full h-full bg-[url("/img/girl1.jpg")] bg-cover bg-center `}>

//                         </div>

//                     </CarouselItem>
//                     <CarouselItem className=' w-full h-full pl-0 ' >
//                         <div className={` w-full h-full bg-[url("/img/girl2.jpg")] bg-cover bg-center`}>

//                         </div>


//                     </CarouselItem>


//                 </CarouselContent>



//             </Carousel >

//         </div >
//     )
// }

// export default ImageCarousel