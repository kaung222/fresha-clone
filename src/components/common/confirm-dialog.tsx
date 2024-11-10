import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";

type ConfirmDialogProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  children: React.ReactNode;
  button?: string;
  isPending?: boolean;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { title, description, onConfirm, children, button = 'Continue', isPending = false } = props;
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className=" z-[90] ">
          <AlertDialogHeader>
            <AlertDialogTitle className=" font-heading text-zinc-900 text-heading ">{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={onConfirm} className=" ">
              {isPending ? (
                <>
                  <Loader2 className=" w-4 h-4 animate-spin " />
                </>
              ) : (button)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmDialog;
