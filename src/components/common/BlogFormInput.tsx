'use client'
import React, { useEffect, useRef } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, UseFormReturn } from "react-hook-form";
type FormTextareaProps = {
    // form: UseFormReturn<FieldValues, any, undefined>;
    form: any
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string | number;
    className?: string;
};
const BlogFormInput = (props: FormTextareaProps) => {
    const {
        form,
        name,
        label,
        description,
        type = "string",
        placeholder,
        defaultValue,
        className
    } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        if (textareaRef.current) {

            // Adjust the textarea's height to fit the content
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;




        }
    };


    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="mt-[8px] font-[500] text-[15px] leading-[22px] text-[rgb(33,37,41)] dark:text-white">
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                onKeyUp={handleInput}
                                placeholder={placeholder}
                                ref={textareaRef}
                                className={` resize-none border-none  dark:border-gray-600 border-[0.8px] focus-visible:ring-offset-0 focus:border-none focus-visible:ring-0 rounded-[6px] text-[rgb(33,37,41)] dark:text-white  py-[6px] bg-white dark:bg-[rgb(40,40,40)] ${className}`}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        </FormControl>
                        <FormDescription className="text-[rgb(142,143,144)] dark:text-[rgb(200,200,200)]">
                            {description}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>

    );
};

export default BlogFormInput;
