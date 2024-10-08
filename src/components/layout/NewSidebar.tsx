"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { sideBarItems } from "@/lib/data";
import LogoWithBrand from "../common/LogoWithBrand";

const NewSidebar = ({ open }: { open: boolean }) => {
  const path = usePathname();
  //   console.log(current_path);
  return (
    <>
      <div
        style={{
          boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className={cn(
          " overflow-auto fixed left-0 top-0 z-30 duration-300  max-h-screen p-5 bg-slate-50 w-[300px]",
          open
            ? " translate-x-0 lg:translate-x-[-300px] "
            : " translate-x-[-300px] lg:translate-x-0 "
        )}
      >
        <ScrollArea className=" [::-webkit-scrollbar]:hidden">
          <div className="py-10 text-center">
            <h2 className=" text-2xl text-blue-700 font-bold">
              Clinic Dashboard
            </h2>
          </div>

          <div className="">
            {sideBarItems.map((item) => {
              return (
                <div className=" mb-5" key={item.name}>
                  <h2 className=" font-semibold text-slate-400 text-lg mb-2">
                    {item.name}
                  </h2>
                  {item.items.map((sidebar_item) => {
                    return (
                      <Link href={sidebar_item.link} key={sidebar_item.name}>
                        <div
                          className={cn(
                            "flex space-x-2 p-3 hover:bg-blue-200 rounded-md font-medium shadow-md shadow-slate-100",
                            path === sidebar_item.link
                              ? " bg-button text-white"
                              : "text-slate-500"
                          )}
                        >
                          {sidebar_item.icon}
                          <h2>{sidebar_item.name}</h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default NewSidebar;
