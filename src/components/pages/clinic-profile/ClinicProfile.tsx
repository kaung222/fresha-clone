"use client";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import Image from "next/image";
import { useGetProfile } from "@/api/clinic/get-profile";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { usePublishClinic } from "@/api/clinic/publish-clinic";
import UpdateClinic from "./update-clinic";
import Loading from "@/components/common/loading";
import LocationPage from "@/components/location/LocationPage";

const ClinicProfile = () => {
  const { data: clinic, isLoading } = useGetProfile();
  const { mutate } = usePublishClinic();
  const handlePublish = () => {
    if (clinic) return mutate({ id: clinic.id });
  };
  if (isLoading) return <Loading />;
  const deleteAccount = () => {
    console.log(clinic?.id);
  };
  return (
    <div>
      <div className=" flex  justify-between items-center ">
        <div className=" px-[12px] ">
          <AppBreadcrumb title="Your Profile" page="Profile" />
        </div>
      </div>

      {/* // profile  */}
      <div
        style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
        className=" mt-6 rounded-[5px]  "
      >
        <div className=" p-12 w-full bg-button "></div>
        <div
          className="flex
         justify-between items-center"
        >
          <div className=" mt-[-48px] ps-4 flex ">
            <Image
              src={
                "https://d276q1ykaqtzjd.cloudfront.net/0e30c1c8-b85e-4848-bfa3-4ee293c6f1aaINBX_IMGservice1.jfif"
              }
              className=" rounded-full w-[200px]"
              alt="profile image"
              width={0}
              height={0}
              priority
            />
            <div className=" mt-6 ms-4 pt-4 ">
              <h5 className=" mt-4 mb-1 text-textDart font-[600] text-[18px] leading-[27px] ">
                {clinic?.name}
              </h5>
              <p>{clinic?.email}</p>
              {clinic && <UpdateClinic clinic={clinic} />}
            </div>
          </div>
          {clinic?.isPublished ? (
            <Button>Unpublished</Button>
          ) : (
            <ConfirmDialog
              onConfirm={handlePublish}
              title="Confirm to publish your clinic"
              description="After publishing, your profile and posts can be share to users and "
            >
              <Button className=" mt-3 bg-button">Publish Clinic</Button>
            </ConfirmDialog>
          )}
        </div>
      </div>

      {/* //  */}
      <div className="relative">
        <div className=" w-full  p-0 ">
          <div>
            <div className=" p-4 pt-6 ">
              <ul className=" mt-6 ">
                <li>
                  <ul>
                    <li className="flex h-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Clinic Name:
                      </h6>
                      <p className=" ms-2 mb-4 text-dashboardText font-[400] text-[15px] leading-[24px] ">
                        {clinic?.name}
                      </p>
                    </li>
                    <li className="flex h-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Clinic Address:
                      </h6>
                      <p className=" ms-2 mb-4 text-dashboardText font-[400] text-[15px] leading-[24px] ">
                        {clinic?.address}
                      </p>
                    </li>
                    <li className="flex h-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Phone Number:
                      </h6>
                      <p className=" ms-2 mb-4 text-dashboardText font-[400] text-[15px] leading-[24px] ">
                        {clinic?.phone}
                      </p>
                    </li>
                    <li className="flex h-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Email:
                      </h6>
                      <p className=" ms-2 mb-4 text-dashboardText font-[400] text-[15px] leading-[24px] ">
                        {clinic?.email}
                      </p>
                    </li>
                    <li className="flex h-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Description:
                      </h6>
                      <p className=" ms-2 mb-4 text-dashboardText font-[400] text-[15px] leading-[24px] ">
                        {clinic?.description}
                      </p>
                    </li>
                    <li className=" py-10 ">
                      <h6 className=" text-button font-[600] text-[15px] leading-[22.5px] ">
                        Location:
                      </h6>

                      {/* Location  */}
                      <LocationPage />
                    </li>
                  </ul>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        {/* timetable section  start*/}
        {/* <Timetable />
        <AssignDoctor /> */}
        {/* timetable section  end*/}
        {/* delete clinic  */}
        <div className=" p-6 ">
          <div className=" p-6 border-b-[0.8px] border-t-[0.8px] border-gray-300 ">
            <h5 className=" text-[rgb(240,115,90)] font-[600] text-[18px] leading-[27px] ">
              Delete Account :
            </h5>
          </div>
          <div className=" p-6 ">
            <h6 className=" font-[400] text-[15px] leading-[22.5px] text-textDart ">
              Do you want to delete the account? Please press below
              `&ldquo;Delete`&ldquo; button.
            </h6>
            <div className=" mt-6 ">
              <button
                onClick={deleteAccount}
                className=" py-2 px-5 border-[0.8px] border-[rgb(240,115,90)] bg-[rgb(240,115,90)] text-white rounded-[5px] text-[15px] font-[400] leading-[22.5px] "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
