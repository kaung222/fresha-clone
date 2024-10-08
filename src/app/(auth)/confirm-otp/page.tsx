"use client";
import ConfirmOtp from "@/components/auth/confirm-otp";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [nextStep, setNextStep] = useState("");
  return (
    <>
      <ConfirmOtp nextStep={setNextStep} />
    </>
  );
};

export default Page;
