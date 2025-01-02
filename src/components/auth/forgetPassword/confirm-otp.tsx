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
import { useEffect, useState } from "react";
import { useLocalstorage } from "@/lib/helpers";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Image from "next/image";
import { useConfirmOtp } from "@/api/auth/confirm-otp";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/api/ApiClient";
import { ArrowLeft, Loader2 } from "lucide-react";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import LogoWithBrand from "@/components/common/LogoWithBrand";
import { secondToHour } from "@/lib/utils";



export default function ConfirmOtpForForgetPassword() {
    const [value, setValue] = useState("");
    const { getQuery, setQuery } = useSetUrlParams();
    const email = getQuery('email');
    const expire = getQuery('expire');
    const { mutate, isPending } = useConfirmOtp()
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<number>(0)


    useEffect(() => {
        if (Number(expire) > (new Date().getTime())) {
            const timer = setInterval(() => {
                setTimeLeft(Number(expire) - (new Date().getTime()));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [setTimeLeft, timeLeft, expire]);


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
            await ApiClient.get(`/auth/otp/${email}`).then(res => {
                res.data && setQuery({ key: 'expire', value: String(new Date().getTime() + 300000) })
            });
        }
    };
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-brandColorLight p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-md mb-4">
                            <LogoWithBrand />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Otp code</h2>
                        <p className="text-gray-600">Enter the 6-digital codes sent to [{email}] to reset your password.</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <div className=" flex justify-between ">
                                        <Label htmlFor="otp">OTP Code</Label>
                                        {timeLeft > 0 ? (
                                            <span>{secondToHour(Number(((timeLeft / 1000) * 60).toFixed(0)))}</span>
                                        ) : (
                                            <span className=" text-delete ">expired</span>
                                        )}
                                    </div>
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
                                <Button disabled={isPending} onClick={handleVerify} type="button" className="w-full bg-brandColor hover:bg-brandColor/80 ">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Confirming...
                                        </>
                                    ) : (
                                        'Confirm OTP'
                                    )}
                                </Button>
                            </form>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">

                            <div className="text-muted-foreground text-sm">
                                Do not receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={reRequestOtp}
                                    className=" hover:underline text-text leading-text font-semibold text-brandColor "
                                >
                                    Resend
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Need help?{' '}
                            <a href="/contact" className="font-medium text-[#FF66A1] hover:underline">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* <div className="flex min-h-screen w-full bg-white justify-center items-center relative">
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
                                            <Label htmlFor="otp">OTP Code</Label>
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
            </div> */}

        </>
    );
}