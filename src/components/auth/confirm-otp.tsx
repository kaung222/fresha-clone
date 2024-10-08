"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useState } from "react";
import { useConfirmOtp } from "@/api/auth/confirm-otp";
import { useLocalstorage } from "@/lib/helpers";
import { useRequestOtp } from "@/api/auth/request-otp";

type Props = {
  nextStep: React.Dispatch<React.SetStateAction<string>>;
  passwordNextStep?: React.Dispatch<React.SetStateAction<string>>;
};

export default function ConfirmOtp({ nextStep }: Props) {
  const [value, setValue] = useState("");
  const { getData } = useLocalstorage();
  const emailData = getData("registerEmail") || getData("forgetEmail");
  const { mutate } = useConfirmOtp();
  const { mutate: requestOtp } = useRequestOtp();
  const handleVerify = () => {
    console.log(value);
    if (emailData) {
      mutate(
        { email: emailData, otp: value },
        {
          onSuccess: () => {
            nextStep("3");
          },
        }
      );
    }
  };
  const reRequestOtp = () => {
    if (emailData) {
      requestOtp({ email: emailData });
    }
  };
  return (
    <>
      <div className=" w-full h-screen flex justify-center items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
            <CardDescription>
              Enter the OTP code sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <InputOTP
                  maxLength={6}
                  pattern="^[0-9]+$"
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button onClick={handleVerify} type="button" className="w-full">
                Verify
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-muted-foreground text-sm">
              Do not receive the code?{" "}
              <button
                type="button"
                onClick={reRequestOtp}
                className="underline"
              >
                Resend
              </button>
            </div>
            {/* <div className="bg-green-500 text-green-50 px-2 py-1 rounded-md text-sm font-medium" role="alert">
                    OTP Verified
                </div> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
