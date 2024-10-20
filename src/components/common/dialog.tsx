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
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle className=" font-[500] text-[20px] leading-[20px] text-[#0A0A0A] ">
              {title}
            </DialogTitle>
            <DialogHeader className=" z-[90] ">{children}</DialogHeader>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppDialog;
