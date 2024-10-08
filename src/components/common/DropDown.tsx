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
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] h-h-screen-minus-80 p-2 absolute right-[-18px] overflow-y-auto ">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
