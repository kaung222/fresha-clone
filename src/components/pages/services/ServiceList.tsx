"use client";
import { useGetServices } from "@/api/service/get-service";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import React from "react";
import ServiceCard from "./ServiceCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/loading";
import EmptyData from "@/components/common/empty-data";
import { DataTable } from "@/components/common/data-table";
import { serviceColumns } from "./column";
import CreateService from "./ServiceCreate";
import PaginationBar from "@/components/common/PaginationBar";
import CircleLoading from "@/components/layout/circle-loading";
import ErrorPage from "@/components/layout/DataErrorPage";

const ServiceList = () => {
  const { data, isLoading } = useGetServices();
  // if (isLoading) return <Loading />;

  return (
    <>
      <div className=" flex  justify-between items-center ">
        <AppBreadcrumb title="Services" page="Services" />
        <CreateService />
      </div>
      {isLoading ? (
        <div>
          <CircleLoading />
        </div>
      ) : data ? (
        <>

          <DataTable columns={serviceColumns} data={data?.records} pagination={(
            <div className="flex items-center justify-end space-x-2 py-4">
              <PaginationBar totalPages={Number(data?._metadata.pageCount)} />
            </div>
          )} />
        </>
      ) : (
        <ErrorPage />
      )}

    </>
  );
};

export default ServiceList;
