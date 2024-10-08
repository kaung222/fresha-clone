"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./data-table-column-header"
import { User } from "@/types/user"
import ViewUser from "./view-user"
import { formatDistance } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    bookingId: string;
    bookingDate: Date;
    description?: string;
    status: string;
    user?: User;
    phone: string;
    name: string;
    gender: string;
    age: string;
    createdAt: Date;
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'bookingId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        ),
    },
    {
        accessorKey: 'bookingDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Create Date" />
        ),
        cell: ({ row }) => <div>{formatDistance(new Date(), row.original.createdAt)} ago</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gender" />
        ),
    },
    {
        accessorKey: 'age',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Age" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <>
                    <div>

                        {row.original.status == "PENDING" && (
                            <div className="px-2 py-1 inline-block rounded-full bg-orange-500 text-green-50 text-xs font-medium">Pending</div>
                        )}
                        {row.original.status == "CONFIRMED" && (
                            <div className="px-2 py-1 inline-block rounded-full bg-green-500 text-green-50 text-xs font-medium">Confirm</div>
                        )}
                        {row.original.status == "CANCELED" && (
                            <div className="px-2 py-1 inline-block rounded-full bg-red-500 text-green-50 text-xs font-medium">Cancel</div>
                        )}
                    </div>
                </>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

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
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            what
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}>
                            <ViewUser />
                        </DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
