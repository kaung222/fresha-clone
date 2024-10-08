import React from "react";
import { UseFormReturn } from "react-hook-form";

type FormInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string | number;
};
const FormTextarea: React.FC<FormInputProps> = ({
  form,
  name,
  label = "",
  description = "",
  placeholder = "",
  defaultValue = "",
}) => {
  return (
    <>
      <div className="">
        <label className=" my-2 font-medium text-base leading-6 text-gray-900">
          {label}
        </label>
        <textarea
          placeholder={placeholder}
          rows={5}
          {...form.register(name)}
          className=" outline-none w-full p-3 mt-2 border border-slate-300 rounded-md"
          defaultValue={defaultValue}
        ></textarea>
        {description && <p>{description}</p>}
      </div>
    </>
  );
};

export default FormTextarea;
