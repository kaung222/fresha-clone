import ContentContainer from "@/components/layout/contentContainer";
import Image from "next/image";
import React from "react";

type Props = {};

const AllInOneSection = (props: Props) => {
  return (
    <div className=" py-[80px] bg-[rgb(248,249,251)] ">
      <ContentContainer>
        <div className=" flex flex-col lg:flex-row ">
          <div
            className=" px-[15px] w-full
                     lg:w-[50%] "
          >
            <Image
              fill
              src="https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/image-08.png"
              className=" w-full h-full"
              alt=""
            />
          </div>
          <div className=" px-[15px] w-full lg:w-[50%] ">
            <div className=" mt-[40px] ">
              <div className=" mb-[23px] text-button font-[900] text-[14.64px] leading-[21.96px] ">
                WELCOME TO MEDSERVICE
              </div>
              <div className=" my-[20px] text-heading font-[700] text-[34px] leading-[40.8px] ">
                Complete Medical Solutions in One Place
              </div>
              <p className=" mb-[16px] text-text font-[300] text-[16px] leading-[24px]  ">
                Porta semper lacus cursus, feugiat primis ultrice in ligula
                risus lorem auctor tempus feugiat dolor lacinia cubilia curae
                integer congue leo metus, eu mollislorem primis in orci integer
                metus mollis faucibus. An enim nullam tempor sapien gravida
                donec pretium and ipsum porta justo integer at velna vitae
                auctor integer congue
              </p>
            </div>
            <div className=" mt-[35px] mb-[15px] ">
              <div className=" text-text text-[16px] font-[300] leading-[24px] ">
                Randon Pexon, Head of Clinic
              </div>
            </div>
            <div>
              <Image
                fill
                src="https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/signature.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default AllInOneSection;
