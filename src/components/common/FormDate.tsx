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
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { format } from "date-fns";

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

const FormDate: React.FC<FormInputProps> = ({
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
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                id="start-date"
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span className="text-muted-foreground">{placeholder}</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(e) => field.onChange(e)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
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

export default FormDate;
