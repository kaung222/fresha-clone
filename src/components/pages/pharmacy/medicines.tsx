"use client";
import { useDeleteMedicine } from "@/api/medicine/delete-medicine";
import { useGetMedicines } from "@/api/medicine/get-medicines";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import DeleteButton from "@/components/common/confirm-delete";
import EmptyData from "@/components/common/empty-data";
import Loading from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";

const Products = () => {
  const { data, isLoading } = useGetMedicines();
  const { mutate } = useDeleteMedicine();
  const handleDelete = (id: string) => {
    console.log(id);
    mutate({ id });
  };
  if (isLoading) return <Loading />;

  return (
    <div>
      <AppBreadcrumb page="Medicines" />
      {data?.records.length === 0 && <EmptyData name="product" />}
      <div className="space-y-3">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className=" bg-[#97B3CE] text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Name
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.records?.map((medicine) => {
              return (
                <tr
                  className="border-t odd:bg-[#F1F3F6] even:bg-[#E5EFF9]"
                  key={medicine.id}
                >
                  <td className="px-6 py-1">
                    {formatDate(medicine.createAt, "DD-MM-YY")}
                  </td>
                  <td className="px-6 py-1">{medicine.name}</td>
                  <td className="px-6 py-1">{medicine.price}</td>
                  <td className="px-6 py-1">{medicine.stock}</td>
                  <td className="px-6 py-1"> {medicine?.description}</td>

                  <td className=" py-2 flex space-x-2">
                    <DeleteButton
                      title="Are you sure to delete medicine?"
                      handleConfirm={() => {
                        handleDelete(medicine.id);
                      }}
                    ></DeleteButton>
                    <Button>Edit</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
