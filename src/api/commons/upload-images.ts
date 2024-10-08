import { ApiClient } from "../ApiClient";
import { FileClient } from "../FileClient";

type UploadImagesReponse = {
  imageUrls: string[];
};

export async function UploadImages(
  images: File[]
): Promise<UploadImagesReponse> {
  const formData = new FormData();
  images.map((image) => formData.append("files", image));
  const { data } = await FileClient
    .post("files/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  return data;
}
