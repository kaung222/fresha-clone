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

const FormTags: React.FC<FormTagsProps> = ({
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
    if (e.key === "Enter" || e.key === ",") {
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
              <div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-red-500"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="size-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center relative  border-[0.7px] rounded-[6px] ">
                  <Input
                    placeholder={placeholder}
                    type={type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 pe-4 "
                  />
                  <div onClick={addTag} className="ml-4 absolute top-0 right-0 h-full px-2 bg-zinc-500 flex items-center rounded-r-[6px] cursor-pointer hover:bg-gra-200  ">
                    {icon}
                  </div>
                </div>
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

export default FormTags;