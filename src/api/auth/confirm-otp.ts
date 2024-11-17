import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { ErrorResponse } from "@/types/response";
import { toast } from "@/components/ui/use-toast";

type PayloadType = {
    email: string;
    otp: string;
}

type ResponseType = {
    message: string;
}

export const useConfirmOtp = () => {
    return useMutation<ResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post("/auth/otp/confirm", payload).then(res => res.data)
        },
        onSuccess: (data) => {
            toast({ title: "email confirmed!" })
            return;
        },
        onError: (error) => {
            // console.log(error);
            if (error.status == 401) {
                toast({ title: 'Otp is not correct!' })
            }

        }
    })
}