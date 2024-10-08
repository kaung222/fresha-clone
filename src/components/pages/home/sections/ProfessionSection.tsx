import ContentContainer from "@/components/layout/contentContainer";
import Image from "next/image";
import React from "react";

const profession = [
  {
    img: "https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/general_dentistry_800x600.jpg",
    heading: "General Dentistry",
    para: "Porta semper lacus cursus, feugiat primis ultrice in ligula risus auctor at pretium feugiat dolor integer",
  },
  {
    img: "https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/kids_dentistry_800x600.jpg",
    heading: "Children's Dentistry",
    para: "Porta semper lacus cursus, feugiat primis ultrice in ligula risus auctor at pretium feugiat dolor integer",
  },
  {
    img: "https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/cosmetic_dentistry_800x600.jpg",
    heading: "Cosmetic Services",
    para: "Porta semper lacus cursus, feugiat primis ultrice in ligula risus auctor at pretium feugiat dolor integer",
  },
  {
    img: "https://jthemes.net/themes/wp/medservices/wp-content/themes/medservice/images/dental_emergency_800x600.jpg",
    heading: "Dental Emergency",
    para: "Porta semper lacus cursus, feugiat primis ultrice in ligula risus auctor at pretium feugiat dolor integer",
  },
];

type Props = {};

const ProfessionSection = (props: Props) => {
  return (
    <div className=" pt-[80px] pb-[40px] ">
      <ContentContainer>
        <div className=" mb-[50px] w-full flex justify-center ">
          <div className="  w-full sm:w-[460px] md:w-[515px] lg:w-[555px] xl:w-[555px]  ">
            <h2 className=" tracking-[-0.25px] mb-[20px] font-head text-heading text-[34px] xl:text-[42px] font-[700] text-center ">
              Dentistry is Our Profession
            </h2>
            <p className=" font-head text-[rgb(136,136,136)] text-center text-[17.2px]  font-[300] leading-[25.8px] ">
              Aliquam a augue suscipit, luctus neque purus ipsum neque dolor
              primis libero tempus, tempor posuere ligula varius
            </p>
          </div>
        </div>

        <div className=" flex flex-col lg:flex-row ">
          {profession.map((el, index) => (
            <div key={index} className=" px-[15px] ">
              <div className=" mb-[50px] ">
                <div>
                  <Image src={el.img} className=" w-full " alt="" />
                </div>

                <div className=" mt-[15px] ">
                  <h1 className=" mt-[25px] mb-[15px] text-heading font-[700] text-[21.6px] lg:text-[18px] font-head ">
                    {el.heading}
                  </h1>
                  <p className=" text-para text-[17.2px] font-[300] leading-[25.8px] font-head lg:text-[16px] ">
                    {el.para}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default ProfessionSection;
