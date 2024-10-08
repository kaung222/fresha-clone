import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconMore from "../icons/IconMore";
import Link from "next/link";
import DeleteButton from "./confirm-delete";
import ConfirmDialog from "./confirm-dialog";
import IconEdit from "../icons/IconEdit";

type Props = {
  handleDelete: () => void;
  edit?: string;
};

const EditDeleteBar = ({ handleDelete, edit }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=" focus:outline-none focus:border-none ">
          <IconEdit className=" size-6 stroke-button " />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className=" text-button "
          >
            <Link href={`${edit}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className=" text-delete "
          >
            <ConfirmDialog
              title="are you sure to Delete?"
              description=""
              onConfirm={handleDelete}
            >
              <button className=" text-delete ">delete</button>
            </ConfirmDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default EditDeleteBar;
