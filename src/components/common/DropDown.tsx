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
}

const AppDropdown: React.FC<NotificationMenuProps> = ({
  trigger,
  children,
  zIndex = 80
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border-none focus:border-none outline-none focus:outline-none " >{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent style={{ zIndex: zIndex }} className=" ">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
