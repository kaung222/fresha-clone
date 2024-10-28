import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient";
import { RegisterResponseType } from "@/types/register_response";
import { ErrorResponse } from "@/types/response";
import { toast } from "@/components/ui/use-toast";
import { useLocalstorage } from "@/lib/helpers";

type PayloadType = {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    types: string[]
}
export const useRegisterOrganization = () => {
    const { setData } = useLocalstorage()
    return useMutation<RegisterResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/organization/register`, payload).then((res) => res.data)
        },
        onSuccess: (data) => {
            setData('accessToken', data.accessToken);
            toast({ title: data.message });
            return;
        }
    })
}