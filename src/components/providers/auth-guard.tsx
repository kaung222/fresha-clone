
import { useLocalstorage } from "@/lib/helpers";
import { redirect } from "next/navigation";
import React from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { getData } = useLocalstorage();
  const accessToken = getData("accessToken");
  // console.log(accessToken);
  if (accessToken) redirect("/");
  return (
    <>
      <div className="">{children}</div>
    </>
  );
};

export default AuthGuard;
