import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Mail } from "@/types/mail"
import { PagonationMetadata } from "@/types/_metadata";

type ResponseType = {
    records: Mail[];
    _metadata: PagonationMetadata
}

export const useGetMail = () => {
    return useQuery<ResponseType>({
        queryKey: ['getAllMail'],
        queryFn: async () => {
            return await ApiClient.get(`/emails`).then(res => res.data);
        }
    })
}