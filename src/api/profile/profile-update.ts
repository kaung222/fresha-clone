import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type ProfilePictureUpload = {
    profilePictureUrl: string;
}

export const UploadProfilePicture = (id: string) => {
    return useMutation({
        mutationFn: async (payload: ProfilePictureUpload) => {
            return await ApiClient.patch(`/clinics/${id}/profile-picture`, payload).then(res => res.data)
        }
    })
}