"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ContentContainer from "../layout/contentContainer";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import { useRegister } from "@/api/auth/register";
import { useRequestOtp } from "@/api/auth/request-otp";
import { useLocalstorage } from "@/lib/helpers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { GetAllTags } from "@/api/tags/all-tags";
import FormSelect from "../common/FormSelect";
import LogoWithBrand from "../common/LogoWithBrand";
import { Button } from "../ui/button";
import FormTextarea from "../common/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/validation-schema/register.schema";

type Props = {};

const ClinicRegister = (props: Props) => {
  const [step, setStep] = useState(1);
  const { getData } = useLocalstorage();
  const { mutate } = useRegister();
  const { data } = GetAllTags();
  console.log(data);
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      city: '',
      description: '',
      country: '',
      clinicTypeId: '',
      type: 'clinic'
    }
  });
  const imageUrl =
    "https://www.creativefabrica.com/wp-content/uploads/2023/03/28/Cute-Chicken-Kawaii-Chibi-Graphic-65568834-1.png";
  const clinicRegister = (value: Zod.infer<typeof RegisterSchema>) => {
    console.log({ ...value, type: "Dental Clinic" });
    const payload = {
      ...value,
      clinicTypeId: Number(value.clinicTypeId),
    };
    mutate(payload, {
      onSuccess: () => {
        redirect("/login");
      },
    });
    console.log(payload);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className=" w-full h-full bg-[rgb(248,249,250)]  ">
      <ContentContainer>
        <div className=" w-full h-full flex justify-center ">
          <div className=" w-full md:w-8/12 lg:w-10/12 ">
            <div className=" py-5 flex justify-center items-center">
              <LogoWithBrand />
            </div>
            <div className=" mt-[24px] ">
              <div
                style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
                className=" rounded-[5px] p-[24px] bg-white "
              >
                {step == 1 && (
                  <h4 className=" mb-[8px] text-[22.59px] font-[600] leading-[33.87px] text-[rgb(33,37,41)] text-center ">
                    Clinic Registration - Account Data
                  </h4>
                )}
                {step == 3 && (
                  <h4 className=" mb-[8px] text-[22.59px] font-[600] leading-[33.87px] text-[rgb(33,37,41)] text-center ">
                    Clinic Registration - Clinic Data
                  </h4>
                )}
                {step == 2 && (
                  <h4 className=" mb-[8px] text-[22.59px] font-[600] leading-[33.87px] text-[rgb(33,37,41)] text-center ">
                    Clinic Registration - Clinic Location
                  </h4>
                )}

                <Form {...form}>
                  <form
                    className=" mt-6 grid grid-cols-1 lg:grid-cols-2 "
                    onSubmit={form.handleSubmit(clinicRegister)}
                  >
                    {step == 1 && (
                      <>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="name"
                            label="Name"
                            placeholder="name"
                          />
                        </div>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="phone"
                            label="Phone Number"
                            placeholder="phone"
                          />
                        </div>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="email"
                            label="Email"
                            placeholder="email"
                          />
                        </div>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="password"
                            label="Password"
                            placeholder="Password"
                          />
                        </div>
                      </>
                    )}
                    {step == 2 && (

                      <>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="address"
                            label="Address"
                            placeholder="address"
                          />
                        </div>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="city"
                            label="City"
                            placeholder="city"
                          />
                        </div>
                        <div className=" px-[12px] mb-[16px] ">
                          <FormInput
                            form={form}
                            name="country"
                            label="Country"
                            placeholder="country"
                          />
                        </div>
                      </>
                    )}
                    {step == 3 && (
                      <>
                        <div className="px-[12px] mb-[16px] ">
                          <FormSelect
                            form={form}
                            name="type"
                            label="Hospital or Clinic"
                            // placeholder="Select Type"
                            options={[
                              { name: "Hospital", value: "hospital" },
                              { name: "Clinic", value: "clinic" },
                            ]}
                          />
                        </div>
                        {data && (
                          <div className="px-[12px] mb-[16px] ">
                            <FormSelect
                              form={form}
                              name="clinicTypeId"
                              label="Clinic Type"
                              placeholder="Select Clinic Type"
                              options={data.map((el) => ({
                                name: `${el.engName}`,
                                value: `${el.id}`,
                              }))}
                            />
                          </div>
                        )}
                        {/* <div className=" px-[12px] mb-[16px] ">
                        <FormInput
                          form={form}
                          name="appointmentFees"
                          label="Appointment Fees"
                          placeholder="100"
                          type="number"
                        />
                      </div> */}



                        <div className=" px-[12px] mb-[16px] ">
                          <FormTextarea
                            form={form}
                            name="description"
                            label="Description"
                            placeholder="What you want to say about your clinic...."
                          />
                        </div>
                      </>
                    )}









                    <div className=" px-[12px] flex justify-between ">
                      {step > 1 && (
                        <Button
                          type="button"
                          className=" "
                          onClick={prevStep}
                        >
                          Previous
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          className=" "
                          onClick={nextStep}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="  "
                          onClick={form.handleSubmit(clinicRegister)}
                        >
                          Register
                        </Button>
                      )}
                    </div>

                    <div className=" px-3 ">
                      <p className=" mt-4 flex justify-center items-center ">
                        <small className=" text-textDart text-[13.5px] font-[400] leading-[21.6px] me-4 ">
                          Already have an account ?
                        </small>
                        <span>
                          <a
                            className=" text-textDart font-[700] text-[15px] leading-[24px] "
                            href="/login"
                          >
                            Sign In
                          </a>
                        </span>
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ClinicRegister;
