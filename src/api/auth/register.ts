'use client'
import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient";
import { RegisterResponseType } from "@/types/register_response";
import { ErrorResponse } from "@/types/response";
import { toast } from "@/components/ui/use-toast";
import { useLocalstorage } from "@/lib/helpers";
import { ToastActionElement } from "@/components/ui/toast";
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation";


type PayloadType = {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export const useRegisterOrganization = () => {
    const router = useRouter();
    const { deleteData } = useLocalstorage();
    const { setData } = useLocalstorage()
    return useMutation<RegisterResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/organization/register`, payload).then((res) => res.data)
        },
        onSuccess(data) {
            setData('accessToken', data.accessToken);
            toast({ title: data.message });
            deleteData('email');
            deleteData('name');
            deleteData('services');
            return data;
        },
        onError(error, variables, context) {
            if (error.status == 401) {

                toast({
                    title: error.response?.data.message,
                    description: 'click here to confirm email',
                    variant: "destructive",
                    onClick: () => router.push('/email-confirm')
                });
                return error
            }
            toast({ title: error.response?.data.message, variant: 'destructive' })
        },
    })
}