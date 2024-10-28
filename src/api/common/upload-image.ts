import { ApiClient } from "../ApiClient";

type UploadImageResponse = {
    imageUrl: string;
}

export async function UploadImage(image: Blob): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append("file", image);
    const { data } = await ApiClient.post('files', formData, {
        onUploadProgress: (ProgressEvent) => console.log(ProgressEvent.loaded),
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })


    return data;
}