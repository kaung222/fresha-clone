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
};

const FormInput: React.FC<FormInputProps> = ({
  form,
  name,
  label = "",
  defaultValue,
  description = "",
  placeholder = "",
  type = "text",
  disabled,
}) => {
  return (
    <>
      <div className=" my-3">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && (
                <FormLabel className="mt-2 font-medium text-base leading-6 text-gray-900">
                  {label}:
                </FormLabel>
              )}
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={type}
                  {...field}
                  value={field.value || ""}
                  className="border-gray-300 border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 font-normal text-sm"
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
