import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useUnpublishDoctor = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.patch(
                `doctors/${payload.id}/unpublish`,
                payload
            ).then((res) => res.data);
        },
        onSuccess(res) {
            toast({ description: "unpublish Doctor Successfully!" });
            queryClient.invalidateQueries({
                queryKey: ['GetDoctors'],
                exact: false,
            })
        },
    });
};
