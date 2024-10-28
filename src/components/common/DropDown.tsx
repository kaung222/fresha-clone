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
}

const AppDropdown: React.FC<NotificationMenuProps> = ({
  trigger,
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className=" z-[90] ">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
