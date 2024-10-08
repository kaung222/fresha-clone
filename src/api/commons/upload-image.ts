import { ApiClient } from "../ApiClient";
import { FileClient } from "../FileClient";

type UploadImageReponse = {
  imageUrl: string;
};

export async function UploadImage(image: Blob): Promise<UploadImageReponse> {
  const formData = new FormData();
  formData.append("file", image);
  const { data } = await FileClient.post("files", formData, {
    onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
