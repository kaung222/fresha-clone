export const getImageIdFromImageUrl = (imageUrl: string) => {
  const baseUrl = "https://d276q1ykaqtzjd.cloudfront.net/";
  const objectId = imageUrl.replace(baseUrl, "");
  return objectId.split("INBX_IMG")[0];
};
