import ContentContainer from '@/components/layout/contentContainer'
import React from 'react'

type Props = {}

const Heading = (props: Props) => {
    return (
        <div className=' bg-[rgb(248,249,251)] '>
            <ContentContainer>
                <div className=' py-[35px] '>
                    <div>
                        <h2 className=' my-[8px] text-heading font-[900] font-head text-[22px]  '>Services</h2>
                        <div></div>
                    </div>

                </div>

            </ContentContainer>
        </div>
    )
}

export default Heading