import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

type FormInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  id?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  form,
  name,
  label = "",
  defaultValue,
  description = "",
  placeholder = "",
  type = "text",
  id,
  disabled,
}) => {
  return (
    <>
      <div className="">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && (
                <FormLabel htmlFor={id}>
                  {label}
                </FormLabel>
              )}
              <FormControl>
                <Input
                  id={id}
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  value={field.value || ""}
                  className=" focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                  disabled={disabled}
                />
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default FormInput;
