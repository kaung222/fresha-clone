
'use client'
import { useLocalstorage } from "@/lib/helpers";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { getData } = useLocalstorage();
  const router = useRouter()

  useEffect(() => {
    const accessToken = getData("accessToken");

    if (accessToken) {
      router.push('/calendar')
    }
  }, []);
  return (
    <>
      <div className="">{children}</div>
    </>
  );
};

export default AuthGuard;
