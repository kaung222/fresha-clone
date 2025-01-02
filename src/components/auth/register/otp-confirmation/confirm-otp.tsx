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
import { Loader2 } from "lucide-react";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { secondToHour } from "@/lib/utils";
import LogoWithBrand from "@/components/common/LogoWithBrand";



export default function ConfirmOtp() {
    const [value, setValue] = useState("");
    const { getData } = useLocalstorage();
    const { getQuery, setQuery } = useSetUrlParams()
    const { mutate, isPending } = useConfirmOtp()
    const expire = getQuery('expire');
    const email = getData('email');
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<number>(0)
    console.log(isPending)

    const handleVerify = () => {
        if (email) {
            mutate({ email: email, otp: value }, {
                onSuccess: () => {
                    router.push(`/register`)
                }
            });
        }
    };

    useEffect(() => {
        if (Number(expire) > (new Date().getTime())) {
            const timer = setInterval(() => {
                setTimeLeft(Number(expire) - (new Date().getTime()));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [setTimeLeft, timeLeft, expire]);

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
                        <p className="text-gray-600">Enter the 6 digital code you received in your email.</p>
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



        </>
    );
}