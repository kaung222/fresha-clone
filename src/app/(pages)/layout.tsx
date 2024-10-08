"use client";
import DashboardNavbar from "@/components/layout/dashboardNavbar";
import DashboardSideBarSpacer from "@/components/layout/dashboardSideBarSpacer";
import NewSidebar from "@/components/layout/NewSidebar";
import AppGuard from "@/components/providers/app-guard";
import React, { useState } from "react";

type Props = {};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <AppGuard>
      <DashboardNavbar open={open} handleOpen={handleOpen} />
      <NewSidebar open={open} />
      {/* <NewSidebar open={open} /> */}
      <div className=" flex w-full bg-[rgb(248,249,250)]">
        <DashboardSideBarSpacer open={open} />
        <div className=" px-[12px] flex-grow-1 w-full ">
          <div className=" px-[14px] pt-[94px] pb-[24px] ">{children}</div>
        </div>
      </div>
    </AppGuard>
  );
};

export default Layout;
