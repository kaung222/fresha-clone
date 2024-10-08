import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";

type AppDialogProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
};

const AppDialog = ({ trigger, children, title }: AppDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogClose />
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent className=" min-w-[70%]">
          <DialogHeader>
            <DialogTitle className=" p-4 border-b-[0.8px] border-[rgb(233,236,239)] font-[600] text-[18px] leading-[27px] text-dashboardText ">
              {title}
            </DialogTitle>
            <DialogHeader>{children}</DialogHeader>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppDialog;
