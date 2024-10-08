"use client";
import { useGetServices } from "@/api/service/get-service";
import ContentContainer from "@/components/layout/contentContainer";
import Image from "next/image";
import React from "react";

type Props = {};

const ServiceLists = (props: Props) => {
  const { data } = useGetServices();
  console.log(data);

  return (
    <div className=" py-[80px] ">
      <ContentContainer>
        <div className=" flex flex-col lg:flex-row ">
          {/* leftside  */}

          <div className=" px-[15px] w-full lg:w-8/12 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] ">
              {/* item  */}
              <div
                style={{ boxShadow: "0px 0px 8px 0px" }}
                className=" mb-[70px] p-[15px] shadow-button "
              >
                <div className=" ">
                  <Image
                    fill
                    className=" w-full h-full mb-[25px] "
                    src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/quality_care_800x600.jpg"
                    alt=""
                  />
                  <div className=" ">
                    <h5 className=" mb-[2px] text-heading font-head font-[700] text-[25.6px] leading-[34.56px] ">
                      Routine medical care
                    </h5>
                    <div className=" mb-[8px] flex justify-between ">
                      <div></div>
                      <div className=" text-button font-head text-[14px] font-[500] leading-[21px] ">
                        $39
                      </div>
                    </div>
                    <p className=" text-text font-head text-[16px] font-[300] leading-[24px] lg:leading-[22px] ">
                      Porta semper lacus cursus, feugiat primis ultrice ligula
                      risus auctor tempus feugiat dolor lacinia cursus anulla
                      vitae massa placerat at...
                    </p>
                  </div>
                </div>
              </div>
              {/* item  */}
              <div
                style={{ boxShadow: "0px 0px 8px 0px" }}
                className=" mb-[70px] p-[15px] shadow-button "
              >
                <div className=" ">
                  <Image
                    fill
                    className=" w-full h-full mb-[25px] "
                    src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/quality_care_800x600.jpg"
                    alt=""
                  />
                  <div className=" ">
                    <h5 className=" mb-[2px] text-heading font-head font-[700] text-[25.6px] leading-[34.56px] ">
                      Routine medical care
                    </h5>
                    <div className=" mb-[8px] flex justify-between ">
                      <div></div>
                      <div className=" text-button font-head text-[14px] font-[500] leading-[21px] ">
                        $39
                      </div>
                    </div>
                    <p className=" text-text font-head text-[16px] font-[300] leading-[24px] lg:leading-[22px] ">
                      Porta semper lacus cursus, feugiat primis ultrice ligula
                      risus auctor tempus feugiat dolor lacinia cursus anulla
                      vitae massa placerat at...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className=" px-[15px] w-full lg:w-4/12 ">
            <div className=" mt-[50px] lg:mt-0 px-0 lg:px-[30px]  ">
              {/* search  */}
              <div className=" mb-[40px] w-full ">
                <div className=" w-full h-[58px] flex justify-between ">
                  <div className=" w-full h-full flex-grow-1">
                    <input
                      className=" bg-gray-200 rounded-s-[6px] text-[rgb(51,51,51)] focus:outline-none w-full h-full px-[20px] py-[6px] "
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                  <div className=" ms-[-1px] h-full">
                    <button className=" p-[17px] h-full bg-button rounded-e-[6px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* end search  */}

              {/* Categories  */}
              <div className=" mb-[40px] ">
                <h5 className=" mb-[25px] border-b-[0.8px] border-[rgb(221,221,221)] pb-[20px] text-textDart font-head font-[700] text-[21.6px] leading-[25.92px] ">
                  Categories
                </h5>

                <div>
                  <button className=" border-b-[0.8px] border-dashed border-[rgb(192,192,192)] pb-[10px] flex gap-2 ">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="size-5 stroke-button "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                    <span className=" font-head font-[300] text-[16px] leading-[24px] ">
                      Elderly Care
                    </span>
                    <span className="font-head font-[300] text-[16px] leading-[24px]">
                      (1)
                    </span>
                  </button>
                </div>
              </div>

              {/* end categories  */}

              {/* popular service  */}
              <div className=" mb-[40px] ">
                <h5 className=" mb-[25px] border-b-[0.8px] border-[rgb(221,221,221)] pb-[20px] text-textDart font-head font-[700] text-[21.6px] leading-[25.92px] ">
                  Popular Services
                </h5>
                <div>
                  <div className=" border-b-[0.8px] border-dashed border-[rgb(192,192,192)] pb-[10px] flex gap-2 ">
                    <Image
                      fill
                      className=" size-[90px] "
                      src="https://jthemes.net/themes/wp/medservices/wp-content/uploads/2019/08/post-1-img-150x150.jpg"
                      alt=""
                    />
                    <div className=" ps-[20px] flex flex-col justify-center ">
                      <h2 className=" text-textLight text-[18.128px] font-head font-[400]  ">
                        5 Benefits Of Integrative Medicine
                      </h2>
                      <p className=" text-textLightest font-head font-[300] text-[14px] leading-[21px] mt-[6px] ">
                        July 28, 2019
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* end popular services  */}

              {/* Tag  */}
              <div className=" mb-[40px] ">
                <h5 className=" mb-[25px] border-b-[0.8px] border-[rgb(221,221,221)] pb-[20px] text-textDart font-head font-[700] text-[21.6px] leading-[25.92px] ">
                  Popular Services
                </h5>
                <div className=" flex flex-wrap ">
                  <a
                    className=" text-[12px] font-[400] font-head text-textLightest px-[10px] py-[5px] mb-[8px] mr-[2px] border-[1.6px] rounded-[6px] border-[rgb(204,204,204)] uppercase "
                    href=""
                  >
                    diagnostic
                  </a>
                </div>
              </div>

              {/* end tag  */}

              {/* to doctor  */}
              <div className=" mb-[40px] ">
                <div className=" p-[40px] border-[0.8px] rounded-[6px] border-gray-300 ">
                  <h5 className=" mb-[25px]  pb-[20px] text-heading font-head font-[700] text-[21.6px] leading-[25.92px] ">
                    View Doctors
                  </h5>
                  <div>
                    <p className=" mb-[16px] ">
                      At vero eos et accusam et justou dolores et ea rebum tet
                      clita kasd gubergren no sea takimata.
                    </p>
                    <button className=" px-[30px] py-[14px] border-[1.6px] border-button bg-button text-white font-[400] font-head text-[17.2px]  ">
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* end to doctor  */}
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ServiceLists;
