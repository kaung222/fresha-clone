import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Booking } from "@/types/booking";
import { useLocalstorage } from "@/lib/helpers";
import { Clinic } from "@/types/clinic";

type GetBookingsResponse = {
  _metadata: PagonationMetadata;
  records: Booking[];
};

export const useGetBookings = () => {
  const { getQuery } = useSetUrlParams();
  const { getData } = useLocalstorage();
  const search = getQuery("search"); //use only search by bookingId.
  const page = getQuery("page");
  const per_page = getQuery("page_limit");
  const clinic: Clinic = getData("clinic");
  const params = useQueryString({ search, page, per_page });
  return useQuery<GetBookingsResponse>({
    queryKey: ["GetBookings", search, page, per_page],
    queryFn: async () => {
      return await ApiClient.get(`/clinics/${clinic.id}/bookings`, {
        params,
      }).then((res) => res.data);
    },
  });
};
