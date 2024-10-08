import React from "react";
import ContentContainer from "./contentContainer";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className=" bg-blue-800 pt-[80px] pb-[40px] ">
      <ContentContainer>
        <div>
          {/* items  */}
          <div className=" px-[15px] ">
            <div className=" mb-[40px] ">
              <Image
                fill
                className=" h-[40px] "
                src="https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/footer-logo-white.png"
                alt=""
              />
              <p className=" my-[15px] font-head text-[17.2px] font-[300] leading-[25.8px] text-white  ">
                Aliquam orci nullam tempor sapien gravida donec an enim ipsum
                porta justo at velna auctor congue
              </p>
            </div>
          </div>
        </div>

        <div className=" pt-[20px] border-t-[0.8px] border-white ">
          <div className=" px-[15px] ">
            <p className=" text-[16px] leading-[24px] font-head font-[300] text-white ">
              © 2019 Medservice. All Rights Reserved
            </p>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Footer;
