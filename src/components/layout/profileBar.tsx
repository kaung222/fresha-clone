import React from "react";
import AppDropdown from "../common/DropDown";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import LogoutButton from "./logot-button";
import Image from "next/image";
import Link from "next/link";

const ProfileBar = () => {
  return (
    <div>
      <AppDropdown
        trigger={
          <Image
            src="https://shreethemes.in/doctris/layouts/assets/images/doctors/01.jpg"
            className=" w-9 h-9 "
            width={80}
            height={80}
            alt=""
          />
        }
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </AppDropdown>
    </div>
  );
};

export default ProfileBar;
