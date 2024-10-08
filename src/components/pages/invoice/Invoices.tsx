"use client";

import { useGetInvoices } from "@/api/invoice/get-invoices";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import DeleteButton from "@/components/common/confirm-delete";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateInvoice from "./create-invoice";
import { useDeleteInvoice } from "@/api/invoice/delete-invoice";
import EmptyData from "@/components/common/empty-data";
import Loading from "@/components/common/loading";

const Invoices = () => {
  const { data, isLoading } = useGetInvoices();
  const { mutate } = useDeleteInvoice();
  const handleDelete = (id: string) => {
    mutate({ id });
  };
  if (isLoading) return <Loading />;
  return (
    <div>
      <AppBreadcrumb page="Invoices" />
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
              <th scope="col" className="px-6 py-3 text-end">
                price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.records?.map((invoice) => {
              return (
                <tr
                  className="border-t odd:bg-[#F1F3F6] even:bg-[#E5EFF9]"
                  key={invoice.id}
                >
                  <td className="px-6 py-1"> 7/7/2024</td>
                  <td className="px-6 py-1">{invoice.name}</td>
                  <td className="px-6 py-1 text-end">$ {invoice.price}</td>
                  <td className="px-6 py-1 text-end">{invoice.quantity}</td>
                  <td className="px-6 py-1"> {invoice?.description}</td>
                  <td className="px-6 py-1">$ {invoice.amount}</td>
                  <td className=" py-2 flex space-x-2">
                    <DeleteButton
                      title="Are you sure to delete invoice?"
                      handleConfirm={() => {
                        handleDelete(invoice.id);
                      }}
                    ></DeleteButton>
                    <Button>Edit</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-200">
              <td
                className="py-3 px-6 text-center font-bold text-lg"
                colSpan={5}
              >
                Total amount
              </td>
              <td
                colSpan={2}
                className=" text-start px-3 text-lgn font-semibold"
              >
                $ {data?.totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
        {data?.records.length === 0 && <EmptyData name="invoice" />}
        <CreateInvoice />
      </div>
    </div>
  );
};

export default Invoices;
