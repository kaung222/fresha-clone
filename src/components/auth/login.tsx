"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ContentContainer from "../layout/contentContainer";
import { Form } from "../ui/form";
import FormInput from "../common/FormInput";
import { useRouter } from "next/navigation";
import { useLogin } from "@/api/auth/login";
import { LoginSchema } from "@/validation-schema/login.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import LogoWithBrand from "../common/LogoWithBrand";
import { Button } from "../ui/button";

const ClinicLogin = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: "Admin@123",
    },
  });

  const clinicLogin = (value: z.infer<typeof LoginSchema>) => {
    mutate(value);
  };
  return (
    <div className=" w-full h-full bg-[rgb(248,249,250)]  ">
      <ContentContainer>
        <div className=" w-full h-full flex justify-center ">
          <div className=" w-full md:w-8/12 lg:w-5/12 ">
            <div className=" py-5 flex justify-center items-center ">
              <LogoWithBrand />
            </div>
            <div className=" mt-[24px] ">
              <div
                style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
                className=" rounded-[5px] p-[24px] bg-white "
              >
                <h4 className=" mb-[8px] text-[22.59px] font-[600] leading-[33.87px] text-[rgb(33,37,41)] text-center ">
                  Clinic Sign In
                </h4>

                <Form {...form}>
                  <form
                    className=" mt-6 "
                    onSubmit={form.handleSubmit(clinicLogin)}
                  >
                    <div className=" px-[12px] mb-[16px] ">
                      <FormInput
                        form={form}
                        name="email"
                        label="Email"
                        placeholder="Email"
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

                    <div className=" px-[12px] ">
                      <Button
                        type="submit"
                        className=" w-full"
                      >
                        {isPending ? "logging in ..." : "Login"}
                      </Button>
                    </div>

                    <div className=" px-3 ">
                      <p className=" mt-4 flex justify-center items-center ">
                        <small className=" text-textDart text-[13.5px] font-[400] leading-[21.6px] me-4 ">
                          Do not have an account ?
                        </small>
                        <span>
                          <a
                            className=" text-textDart font-[700] text-[15px] leading-[24px] "
                            href="/register"
                          >
                            Sign Up
                          </a>
                        </span>
                        <Link
                          href={`forget-password`}
                          className=" text-blue-500 text-[13px] ms-1 underlined "
                        >
                          Forget Password!
                        </Link>
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

export default ClinicLogin;
