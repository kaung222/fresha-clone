"use client";
import AuthGuard from "@/components/providers/auth-guard";
import { useLocalstorage } from "@/lib/helpers";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { getData } = useLocalstorage();
  const accessToken = getData("accessToken");
  // console.log(accessToken);
  if (accessToken) redirect("/");
  return (
    <>
      <AuthGuard>
        <div className="">{children}</div>
      </AuthGuard>
    </>
  );
};

export default AuthLayout;
