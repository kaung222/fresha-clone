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
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type FormRadioProps = {
    // form: UseFormReturn<FieldValues, any, undefined>;
    form: any
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string;
    options: { label: string; value: string; id: string }[];

};
const FormRadio = (props: FormRadioProps) => {
    const {
        form,
        name,
        label,
        description,
        type = "string",
        placeholder,
        defaultValue,
        options
    } = props;
    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className=" mt-[8px] font-[500] text-[15px] leading-[22px] text-[rgb(33,37,41)] ">{label}</FormLabel>
                        <FormControl>
                            <RadioGroup value={field.value} onValueChange={field.onChange} >
                                {options.map((el) => (
                                    <div key={el.id} className="flex items-center space-x-2">
                                        <RadioGroupItem className=" " value={el.value} id={el.id} />
                                        <Label className="  font-[500] text-[15px] leading-[22px] text-button " htmlFor={el.id}>{el.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default FormRadio;