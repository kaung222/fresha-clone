'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import ContentContainer from '@/components/layout/contentContainer'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <div className=' h-[500px] sm:h-[540px] md:h-[560px] lg:h-[600px] xl:h-[650px]  w-full relative '>

            <Carousel opts={{
                align: "start",
                loop: true,
            }} plugins={[
                Autoplay({
                    delay: 5000,
                })
            ]} className=" w-full h-full relative  overflow-hidden ">
                <CarouselContent className=' absolute w-full h-full ml-0  top-0 left-0'>
                    <CarouselItem className=' w-full h-full pl-0 ' >
                        <div className=' w-full h-full bg-[url("https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/slider/slide-8.jpg")] bg-cover bg-center '>
                            <div className=' w-full h-full relative z-[5] '>
                                <ContentContainer>
                                    <div className=" px-[15px] w-full h-full flex flex-col justify-center ">
                                        <h3 className='  mb-[25px] text-button text-[14.64px] font-[900] leading-[21.96px] '>WELCOME TO MEDSERVICE</h3>
                                        <div className=' w-full flex '>

                                            <div className=' w-full sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12  '>
                                                {/* Heading  */}
                                                <div className=' text-heading text-[34px] lg:text-[42px] leading-[40.8px] font-[700] mb-[20px] '>Healthy Smile You Deserve</div>
                                                {/* para  */}
                                                <div className=' text-text text-[17.2px] leading-[25.8px] font-[300] mb-[16px] '>
                                                    paragraph

                                                </div>
                                                {/* button  */}
                                                <button className=' px-[30px] py-[14px] border-[1.6px] bg-button mt-[15px] border-button text-white rounded-[6px] font-[400] text-[17.2px] '>Meet The Doctor</button>
                                            </div>



                                        </div>
                                    </div>
                                </ContentContainer>

                            </div>
                        </div>

                    </CarouselItem>
                    <CarouselItem className=' w-full h-full pl-0 ' >
                        <div className=' w-full h-full bg-[url("https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/slider/slide-9.jpg")] bg-cover bg-center '>
                            <div className=' w-full h-full relative z-[5] '>
                                <ContentContainer>
                                    <div className=" px-[15px] w-full h-full flex flex-col justify-center ">
                                        <h3 className='  mb-[25px] text-button text-[14.64px] font-[900] leading-[21.96px] '>WELCOME TO MEDSERVICE</h3>
                                        <div className=' w-full flex '>

                                            <div className=' w-full sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12  '>
                                                {/* Heading  */}
                                                <div className=' text-heading text-[34px] lg:text-[42px] leading-[40.8px] font-[700] mb-[20px] '>Healthy Smile You Deserve</div>
                                                {/* para  */}
                                                <div className=' text-text text-[17.2px] leading-[25.8px] font-[300] mb-[16px] '>
                                                    paragraph

                                                </div>
                                                {/* button  */}
                                                <button className=' px-[30px] py-[14px] border-[1.6px] bg-button mt-[15px] border-button text-white rounded-[6px] font-[400] text-[17.2px] '>Meet The Doctor</button>
                                            </div>



                                        </div>
                                    </div>
                                </ContentContainer>

                            </div>
                        </div>

                    </CarouselItem>
                    <CarouselItem className=' w-full h-full pl-0 ' >
                        <div className=' w-full h-full bg-[url("https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/slider/slide-7.jpg")] bg-cover bg-center '>
                            <div className=' w-full h-full relative z-[5] '>
                                <ContentContainer>
                                    <div className=" px-[15px] w-full h-full flex flex-col justify-center ">
                                        <h3 className='  mb-[25px] text-button text-[14.64px] font-[900] leading-[21.96px] '>WELCOME TO MEDSERVICE</h3>
                                        <div className=' w-full flex '>

                                            <div className=' w-full sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12  '>
                                                {/* Heading  */}
                                                <div className=' text-heading text-[34px] lg:text-[42px] leading-[40.8px] font-[700] mb-[20px] '>Healthy Smile You Deserve</div>
                                                {/* para  */}
                                                <div className=' text-text text-[17.2px] leading-[25.8px] font-[300] mb-[16px] '>
                                                    Feugiat primis ligula risus auctor egestas augue mauri viverra tortor in iaculis placerat eugiat mauris ipsum in viverra tortor and gravida purus and pretium at lorem primis in orci integer

                                                </div>
                                                {/* button  */}
                                                <button className=' px-[30px] py-[14px] border-[1.6px] bg-button mt-[15px] border-button text-white rounded-[6px] font-[400] text-[17.2px] '>Meet The Doctor</button>
                                            </div>



                                        </div>
                                    </div>
                                </ContentContainer>

                            </div>
                        </div>


                    </CarouselItem>


                </CarouselContent>



            </Carousel>

        </div>
    )
}

export default HeroSection