'use client'
import { useGetBookings } from "@/api/bookings/get-bookings";
import { columns, Payment } from "./table/columns"
import { DataTable } from "@/components/common/data-table";




export default function DataTablePage() {
  const { data: bookingData } = useGetBookings();
  const data: Payment[] = [];
  bookingData?.records.map((record) => data.push(record));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
