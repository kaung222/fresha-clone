"use client";
import React, { useState } from "react";
import EditDoctor from "./EditDoctor";
import { useGetDetailDoctor } from "@/api/doctor/get-doctor-detail";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  id: string;
};

const DoctorDetailDataProvider = () => {
  const { data } = useGetDetailDoctor();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span>Edit</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] h-screen overflow-auto">
          {data ? <EditDoctor data={data} /> : <div>Loading...</div>}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorDetailDataProvider;
