"use client"
import Link from "next/link";
import DashboardSideBarSpacer from "./dashboardSideBarSpacer";
import Notification from "./notification";
import ProfileBar from "./profileBar";
import { Button } from "../ui/button";
import IconSearch from "../icons/IconSearch";
import { Input } from "../ui/input";
import { MenuIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useDebouncedCallback } from 'use-debounce'
import LogoWithBrand from "../common/LogoWithBrand";
import SingleLogo from "../common/SingleLogo";

type Props = {
  open: boolean;
  handleOpen: () => void;
};

const DashboardNavbar = (props: Props) => {
  const { handleOpen, open } = props;
  const { getQuery, setQuery } = useSetUrlParams();

  return (
    <div className=" flex w-full fixed top-0 left-0 z-40 h-[70px] ">
      <DashboardSideBarSpacer open={open} />
      <div
        style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
        className=" bg-white w-full h-full flex-grow-1 "
      >
        <div className=" p-6 flex justify-between items-center ">
          {/* left group  */}
          <div className=" flex items-center ">

            <Link className=" block 
             " href="/">
              <div className="">
                <SingleLogo />
              </div>
            </Link>
            {/* <div className=" ms-2  w-[115px] h-[22px] hidden relative md:block lg:hidden ">
              <LogoWithBrand />
            </div> */}
            <Button
              onClick={handleOpen}
              className="mr-5 hover:bg-button bg-white group"
            >
              <MenuIcon className=" size-5 stroke-button group-hover:stroke-white" />
            </Button>


            {/* search  */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Search..."
                onChange={useDebouncedCallback((e) => setQuery({ key: 'search', value: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-md bg-background focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* right group  */}
          <div className=" flex gap-2 items-center ">
            <Notification />
            <ProfileBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
