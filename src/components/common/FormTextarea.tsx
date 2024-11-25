import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string | number;
  id?: string;
  required?: boolean
};
const FormTextarea: React.FC<FormInputProps> = ({
  form,
  name,
  label = "",
  description = "",
  placeholder = "",
  defaultValue = "",
  id,
  required
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
                  {label} {required && (<span className=" text-delete">**</span>)}
                </FormLabel>
              )}
              <FormControl>
                <Textarea
                  id={id}
                  placeholder={placeholder}
                  {...field}
                  className=" focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0"
                  value={field.value || ""}
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

export default FormTextarea;
