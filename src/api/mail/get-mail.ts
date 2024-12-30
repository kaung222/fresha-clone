import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Mail } from "@/types/mail"
import { PagonationMetadata } from "@/types/_metadata";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type ResponseType = {
    records: Mail[];
    _metadata: PagonationMetadata
}

export const useGetMail = () => {
    const { getQuery } = useSetUrlParams();
    const page = getQuery('page') || 1;
    const search = getQuery('qc') || '';
    return useQuery<ResponseType>({
        queryKey: ['getAllMail', search, page],
        queryFn: async () => {
            return await ApiClient.get(`/emails`, {
                params: {
                    search,
                    page
                }
            }).then(res => res.data);
        }
    })
}