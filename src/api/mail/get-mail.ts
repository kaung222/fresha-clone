import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Mail } from "@/types/mail"

type ResponseType = {
    data: Mail[];
    page: number;
    pageLimit: number;
    totalCount: number;
}

export const useGetMail = () => {
    return useQuery<ResponseType>({
        queryKey: ['getAllMail'],
        queryFn: async () => {
            return await ApiClient.get(`/emails`).then(res => res.data);
        }
    })
}