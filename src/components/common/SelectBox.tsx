import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { FieldValues, UseFormRegister } from "react-hook-form";

type FormSelectProps = {
  options?: any[];
  name: string;
  register: UseFormRegister<FieldValues>;
  defaultValue?: string;
  placeholder?: string;
};
const SelectBox = (props: FormSelectProps) => {
  const { options, name, register, defaultValue, placeholder } = props;
  return (
    <>
      <Select
        onValueChange={(value) =>
          register(name).onChange({ target: { value, name } })
        }
        defaultValue={defaultValue}
        name={name}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option) => {
              return (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectBox;
