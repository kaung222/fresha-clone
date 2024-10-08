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

type FormTagsProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string[];
};

const FormTags: React.FC<FormTagsProps> = ({
  form,
  name,
  label = "",
  defaultValue = [],
  description = "",
  placeholder = "",
  type = "text",
}) => {
  const [tags, setTags] = useState<string[]>(defaultValue);
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
    <div className="my-3">
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            {label && (
              <FormLabel className="mt-2 font-medium text-base leading-6 text-gray-900">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-red-500"
                        onClick={() => removeTag(tag)}
                      >
                        <X className=" size-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <Input
                    placeholder={placeholder}
                    type={type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-gray-300 border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 font-normal text-sm"
                  />
                  <Button type="button" onClick={() => addTag()} className=" ml-4 bg-button">
                    Add Tag
                  </Button>
                </div>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormTags;
