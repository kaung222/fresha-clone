"use client";
import { useLocalstorage } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AppGuard = ({ children }: { children: React.ReactNode }) => {
  const { getData } = useLocalstorage();
  const router = useRouter();
  const accessToken = getData("accessToken");
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  return <div>{children}</div>;
};

export default AppGuard;
