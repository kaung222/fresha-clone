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
        <label className=" ">
          {label}
        </label>
        <textarea
          placeholder={placeholder}
          rows={5}
          {...form.register(name)}
          className="  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0"
          defaultValue={defaultValue}
        ></textarea>
        {description && <p>{description}</p>}
      </div>
    </>
  );
};

export default FormTextarea;
