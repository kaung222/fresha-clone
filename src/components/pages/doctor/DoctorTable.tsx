"use client";
import { useGetBookings } from "@/api/bookings/get-bookings";
import { columns } from "./dataTableComponents/columns";
import { useGetDoctorsByClinic } from "@/api/doctor/get-doctors";
import { Doctor } from "@/types/doctor";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import PaginationBar from "@/components/common/PaginationBar";
import CircleLoading from "@/components/layout/circle-loading";
import ErrorPage from "@/components/layout/DataErrorPage";

export default function DoctorTable() {
  const { data: DoctorData, isLoading } = useGetDoctorsByClinic();
  console.log(DoctorData)
  return (
    <>
      {isLoading ? (
        <div>
          <CircleLoading />
        </div>
      ) : DoctorData ? (

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={DoctorData?.records} pagination={(
            <div className="flex items-center justify-end space-x-2 py-4">
              <PaginationBar totalPages={Number(DoctorData?._metadata.pageCount)} />
            </div>
          )} />

        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
