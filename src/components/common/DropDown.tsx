import {
  DropdownMenu,
  DropdownMenuContent,
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
      <DropdownMenuTrigger className="">{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" z-[90] absolute right-[-18px] overflow-y-auto ">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
