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
import { UseFormReturn } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


type FormInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    id?: string;
    required?: boolean;
};

const FormInputPhone: React.FC<FormInputProps> = ({
    form,
    name,
    label = "",
    defaultValue,
    description = "",
    placeholder = "",
    id,
    disabled,
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
                                    {label} {required && (<span className=" text-delete ">**</span>)}
                                </FormLabel>
                            )}
                            <FormControl>
                                <div className="relative">
                                    {/* <Input
                    id={id}
                    placeholder={placeholder}
                    {...field}
                    value={field.value || ""}
                    className=" focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0 "
                    disabled={disabled}
                    onWheel={e => e.preventDefault()}
                  /> */}
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="MM"
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="flex mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
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

export default FormInputPhone;
