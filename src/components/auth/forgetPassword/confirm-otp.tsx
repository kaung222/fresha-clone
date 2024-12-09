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
import { useState } from "react";
import { useLocalstorage } from "@/lib/helpers";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Image from "next/image";
import { useConfirmOtp } from "@/api/auth/confirm-otp";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/api/ApiClient";
import { ArrowLeft } from "lucide-react";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";



export default function ConfirmOtpForForgetPassword() {
    const [value, setValue] = useState("");
    const { getQuery, setQuery } = useSetUrlParams();
    const email = getQuery('email');
    const { mutate } = useConfirmOtp()
    const router = useRouter();

    const handleVerify = () => {
        if (email) {
            mutate({ email: email, otp: value }, {
                onSuccess: () => {
                    setQuery({ key: 'step', value: 'new-password' })
                }
            });
        }
    };
    const reRequestOtp = async () => {
        if (email) {
            await ApiClient.get(`/auth/otp/${email}`).then(res => console.log(res.data));
        }
    };
    return (
        <>
            <div className="flex min-h-screen w-full bg-white justify-center items-center relative">
                <button onClick={() => router.back()} className="mb-6 absolute left-11 top-[100px] ">
                    <ArrowLeft className="h-6 w-6 text-brandColor " />
                </button>
                <div className=" flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-row lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-[435px]">

                        <div className="mt-8">

                            <Card className="mx-auto w-full">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl text-center font-bold">We&apos;ve Sent You Code</CardTitle>
                                    <CardDescription className=" text-center  ">
                                        Enter the 6-digital codes sent to [example@gmail.com] to reset your password.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            {/* <Label htmlFor="otp">OTP Code</Label> */}
                                            <InputOTP
                                                maxLength={6}
                                                pattern="^[0-9]+$"
                                                value={value}
                                                onChange={(value) => setValue(value)}
                                            >
                                                <InputOTPGroup className=" gap-5 ">
                                                    <InputOTPSlot index={0} className=" bg-zinc-100 rounded-xl " />
                                                    <InputOTPSlot index={1} className=" bg-zinc-100 rounded-xl " />
                                                    <InputOTPSlot index={2} className=" bg-zinc-100 rounded-xl " />
                                                    <InputOTPSlot index={3} className=" bg-zinc-100 rounded-xl " />
                                                    <InputOTPSlot index={4} className=" bg-zinc-100 rounded-xl " />
                                                    <InputOTPSlot index={5} className=" bg-zinc-100 rounded-xl " />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                        <Button onClick={handleVerify} type="button" className="w-full bg-brandColor hover:bg-brandColor/80 ">
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
                                            className="underline text-text leading-text font-semibold text-zinc-900 "
                                        >
                                            Resend
                                        </button>
                                    </div>

                                </CardFooter>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}