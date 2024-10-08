"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLocalstorage } from "@/lib/helpers";

const LogoutButton = () => {
  const router = useRouter();
  const { deleteData } = useLocalstorage();
  const handleLogout = () => {
    deleteData("accessToken");
    router.push("/login");
  };
  return (
    <>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </>
  );
};

export default LogoutButton;
