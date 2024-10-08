import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

type InputBoxProps = {
  type?: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  defaultValue?: string;
  name: string;
  label?: string;
};
const InputBox = (props: InputBoxProps) => {
  const {
    type = "text",
    register,
    placeholder,
    defaultValue,
    name,
    label,
  } = props;
  return (
    <>
      <div className="">
        <label htmlFor="" className="mb-3 block font-semibold">
          {label}
        </label>
        <Input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name)}
        />
      </div>
    </>
  );
};

export default InputBox;
