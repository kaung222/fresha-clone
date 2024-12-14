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
import { X } from "lucide-react";
import { Button } from "../ui/button";
import TagIcon from "../icons/IconTag";
import { Label } from "../ui/label";

type FormTagsProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string[];
    icon?: React.ReactNode
};

const FormEmailAdd: React.FC<FormTagsProps> = ({
    form,
    name,
    label = "",
    defaultValue = [],
    description = "",
    placeholder = "",
    type = "text",
    icon = (<TagIcon className=" text-white size-6 " />)
}) => {
    const [tags, setTags] = useState<string[]>(form.getValues('tags') || defaultValue);
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            form.setValue(name, newTags);
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
        form.setValue(name, newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="">
            <FormField
                control={form.control}
                name={name}
                render={() => (
                    <FormItem>
                        {label && (
                            <FormLabel >
                                {label}
                            </FormLabel>
                        )}
                        <FormControl>
                            <div className="space-y-2">
                                <div className="flex space-x-2">
                                    <Input
                                        id="to"
                                        placeholder={placeholder}
                                        value={inputValue}
                                        type='email'
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Button type="button" onClick={addTag} variant="brandOutline">
                                        Add
                                    </Button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="p-2 bg-gray-100 rounded">
                                        <Label>{label}:</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {tags.map((email) => (
                                                <span key={email} className="bg-[#FF66A1] text-white px-2 py-1 rounded text-sm flex items-center">
                                                    {email}
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="ml-1 h-4 w-4 text-white hover:text-[#FF66A1] hover:bg-white"
                                                        onClick={() => removeTag(email)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        {description && (
                            <FormDescription className="text-gray-600 dark:text-gray-400">
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

    );
};

export default FormEmailAdd;