import React, { useState } from "react";
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
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ControllableDialog = ({ trigger, children, title, setOpen, open }: AppDialogProps) => {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogClose />
                <DialogTrigger>{trigger}</DialogTrigger>
                <DialogContent className=" z-[85] ">
                    <DialogHeader>
                        <DialogTitle className=" font-[500] text-[20px] leading-[20px] text-[#0A0A0A] ">
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className=" ">{children}</div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ControllableDialog;
