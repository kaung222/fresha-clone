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
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      document.body.style.overflow = 'auto'; // Allow background scrolling
    } else {
      document.body.style.overflow = ''; // Revert to default
    }
  };
  return (
    <>
      <Dialog onOpenChange={handleOpenChange}>
        <DialogClose />
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent className="  z-[100] p-3 max-w-[calc(100vw-20px)] sm:max-w-[400px] ">
          <DialogHeader>
            <DialogTitle className=" font-[500] text-[20px] leading-[20px] text-[#0A0A0A] ">
              {title}
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppDialog;
