
'use client'
import { useLocalstorage } from "@/lib/helpers";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { getData } = useLocalstorage();
  const router = useRouter()
  const accessToken = getData("accessToken");
  useEffect(() => {

    if (accessToken) {
      router.push('/calendar')
    }
  }, [accessToken]);
  return (
    <>
      <div className="">{children}</div>
    </>
  );
};

export default AuthGuard;
