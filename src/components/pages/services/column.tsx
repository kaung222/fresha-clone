import { useDeleteService } from "@/api/service/delete-service";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Service } from "@/types/service";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServiceDataProvider from "./ServiceDataProvider";
import ServiceDelete from "./component/ServiceDelete";
import { doctorFakeImage, serviceFakeImage } from "@/lib/data/placeholderImages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortName } from "@/lib/utils";


export const serviceColumns: ColumnDef<Service>[] = [
  {
    id: 'thumbnailUrl',
    header: "Image",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <>
          <Image
            src={service.thumbnailUrl || serviceFakeImage}
            alt="service"
            width={500}
            height={300}
            className=" w-[80px] h-[50px] "
          />
        </>
      )

    },
  },
  {
    accessorKey: "name",
    header: "Service Name",
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <span className=" line-clamp-2 ">{service.description}</span>
      )
    },
  },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <span>{service.price} Ks</span>
      )
    }
  },

  {
    accessorKey: "isPublished",
    header: "Publish",
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const service = row.original;
      return (
        <span>{service.duration} mins</span>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

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
              <Link href={`/services/${service.id}`}>View Service</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ServiceDataProvider id={service.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={(e) => {
              e.preventDefault();
            }} >
              <ServiceDelete id={service.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
