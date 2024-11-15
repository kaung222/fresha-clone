'use client'
import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";
import { ErrorResponse } from "@/types/response";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useLocalstorage } from "@/lib/helpers";
import { z } from "zod";
import { LoginSchema } from "@/validation-schema/login.schema";

type LoginPayload = z.infer<typeof LoginSchema>

type LoginResponseType = {
    message: string;
    accessToken: string;
    user: Member;
}

export const useLogin = () => {
    const { getData, setData } = useLocalstorage()
    const router = useRouter();
    return useMutation<LoginResponseType, ErrorResponse, LoginPayload>({
        mutationFn: async (payload: LoginPayload) => {
            return await ApiClient.post(`/auth/member-login`, payload).then(res => res.data);
        },
        onSuccess(data) {
            console.log(data);
            setData('accessToken', data.accessToken)
            toast({ title: data.message });
            router.push('/calendar');
            setData('user', data.user)
            return data;
        },
        onError: (error) => {
            toast({ title: "invalid email or wrong password" })
        }
    })
}