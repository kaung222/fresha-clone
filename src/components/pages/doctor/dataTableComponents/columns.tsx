"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Doctor } from "@/types/doctor";
import DoctorDetailDataProvider from "../DoctorDetailDataProvider";
import DoctorDelete from "./action/DoctorDelete";
import DoctorPublish from "./action/DoctorPublish";
import { doctorFakeImage } from "@/lib/data/placeholderImages";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Doctor>[] = [
  {
    id: "profilePictureUrl",
    header: "Profile",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <div className=" w-[50px] h-[50px] ">
          <Image
            src={doctor?.profilePictureUrl ? doctor.profilePictureUrl : doctorFakeImage}
            alt={`${doctor?.name}'s profile`}
            width={50}
            height={50}
            className=" rounded-full block size-[50px] overflow-hidden"
            objectFit="contain"
          />
        </div>
      );
    },
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const doctor = row.original;
      return <div className=" font-medium">{doctor.name}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "speciality",
    header: "Speciality",
    cell: ({ row }) => {
      const doctor = row.original;
      return <div>{doctor?.speciality?.engName}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "isPublished",
    header: "view",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <div className=" space-x-2">
          <DoctorPublish
            doctorId={doctor.id}
            isPublished={doctor.isPublished}
          />
          <span>{doctor.isPublished ? "Public" : "Private"}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <DoctorDetailDataProvider />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <DoctorDelete id={doctor.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
