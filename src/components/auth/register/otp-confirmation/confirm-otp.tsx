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
import { Loader2 } from "lucide-react";



export default function ConfirmOtp() {
    const [value, setValue] = useState("");
    const { getData } = useLocalstorage();
    const { mutate, isPending } = useConfirmOtp()
    const email = getData('email');
    const router = useRouter();

    const handleVerify = () => {
        if (email) {
            mutate({ email: email, otp: value }, {
                onSuccess: () => {
                    router.push(`/register`)
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

            <div className="flex min-h-screen bg-white">
                <div className=" flex flex-col justify-center w-full px-4 my-auto py-12 sm:px-6 lg:flex-row lg:w-[50%] lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-md ">
                        <div className="mt-8">
                            <Card className="mx-auto w-full max-w-md">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl font-bold">Confirm Otp code</CardTitle>
                                    <CardDescription>
                                        Enter the 6 digital code you received in your email.
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
                                        <Button disabled={isPending} onClick={handleVerify} type="button" className="w-full">
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
                                    {/* <div className="bg-green-500 text-green-50 px-2 py-1 rounded-md text-sm font-medium" role="alert">
                    OTP Verified
                </div> */}
                                </CardFooter>
                            </Card>

                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-[50%] ">
                    <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/img/girl.png"
                        alt="Woman using phone and laptop"
                        width={500}
                        height={500}
                    />
                </div>
            </div>




        </>
    );
}