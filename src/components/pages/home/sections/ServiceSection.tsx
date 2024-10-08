import ContentContainer from "@/components/layout/contentContainer";
import Image from "next/image";
import React from "react";

type Props = {};

const ServiceSection = (props: Props) => {
  return (
    <div className=" pt-[100px] pb-[60px] ">
      <ContentContainer>
        <div className=" flex flex-col lg:flex-row px-[15px] ">
          {/* item  */}
          <div className=" px-[15px] ">
            <div className=" mb-[40px] ">
              <Image
                fill
                className=" w-full h-full "
                src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/quality_care_800x600.jpg"
                alt=""
              />
              <div className=" mt-[25px] ">
                <h5 className=" mb-[20px] text-heading font-[900] text-[21.6px] ">
                  Routine medical care
                </h5>
                <p className=" text-text text-[16px] font-[300] leading-[24px] lg:leading-[22px] ">
                  Porta semper lacus cursus, feugiat primis ultrice ligula risus
                  auctor tempus feugiat dolor lacinia cursus anulla vitae massa
                  placerat at...
                </p>
              </div>
            </div>
          </div>
          {/* item  */}
          <div className=" px-[15px] ">
            <div className=" mb-[40px] ">
              <Image
                fill
                className=" w-full h-full "
                src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/quality_care_800x600.jpg"
                alt=""
              />
              <div className=" mt-[25px] ">
                <h5 className=" mb-[20px] text-heading font-[900] text-[21.6px] ">
                  Routine medical care
                </h5>
                <p className=" text-text text-[16px] font-[300] leading-[24px] ">
                  Porta semper lacus cursus, feugiat primis ultrice ligula risus
                  auctor tempus feugiat dolor lacinia cursus anulla vitae massa
                  placerat at...{" "}
                </p>
              </div>
            </div>
          </div>
          {/* item  */}
          <div className=" px-[15px] ">
            <div className=" mb-[40px] ">
              <Image
                fill
                className=" w-full h-full "
                src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/quality_care_800x600.jpg"
                alt=""
              />
              <div className=" mt-[25px] ">
                <h5 className=" mb-[20px] text-heading font-[900] text-[21.6px] ">
                  Routine medical care
                </h5>
                <p className=" text-text text-[16px] font-[300] leading-[24px] ">
                  Porta semper lacus cursus, feugiat primis ultrice ligula risus
                  auctor tempus feugiat dolor lacinia cursus anulla vitae massa
                  placerat at...{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ServiceSection;
