'use client'
import React, { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

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
  required?: boolean;
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
  required
}) => {
  const [showPassword, setShowPassword] = useState(false)

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
                  {label} {required && (<span className=" text-delete ">**</span>)}
                </FormLabel>
              )}
              <FormControl>
                <div className="relative">
                  <Input
                    id={id}
                    placeholder={placeholder}
                    type={type == "password" ? (showPassword ? "text" : "password") : type}
                    {...field}
                    value={field.value || ""}
                    className=" focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0 "
                    disabled={disabled}
                    onWheel={e => e.preventDefault()}
                  />
                  {type == "password" && (

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
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
