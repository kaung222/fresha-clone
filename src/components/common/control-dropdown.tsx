import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NotificationMenuProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    zIndex?: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ControllableDropdown: React.FC<NotificationMenuProps> = ({
    trigger,
    children,
    zIndex = 80,
    open,
    setOpen
}) => {

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} >
            <DropdownMenuTrigger className=" " >{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent style={{ zIndex: zIndex }} className=" ">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ControllableDropdown;
