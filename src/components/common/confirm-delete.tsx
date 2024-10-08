import ConfirmDialog from "./confirm-dialog";
import { Button } from "../ui/button";
import ButtonPrimary from "./Buttons";

const DeleteButton = (props: { handleConfirm: () => void; title: string }) => {
  return (
    <>
      <ConfirmDialog
        title={props.title}
        description=""
        onConfirm={props.handleConfirm}
      >
        <Button className=" bg-red-500">Delete</Button>
        {/* <ButtonPrimary /> */}
      </ConfirmDialog>
    </>
  );
};

export default DeleteButton;
