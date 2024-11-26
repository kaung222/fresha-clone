
import React, { useState } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { asianLanguages } from "@/lib/data";

type FormTagsProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string[];
};

const languageProficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Advanced",
    "Fluent",
    "Native"
]


const FormLanguageAdd: React.FC<FormTagsProps> = ({
    form,
    name,
    label = "",
    defaultValue = [],
    description = "",
    placeholder = "",
    type = "text",
}) => {
    const [tags, setTags] = useState<string[]>(form.getValues('tags') || defaultValue);
    const [inputValue, setInputValue] = useState("");
    const [lanLevel, setLanLevel] = useState("")

    const addLanguage = () => {
        if (inputValue && lanLevel) {
            const newTags = [...tags, `${inputValue}(${lanLevel})`];
            setTags(newTags);
            form.setValue(name, newTags);
            setInputValue("");
            setLanLevel("")
        }
    };

    const removeLanguage = (languageToRemove: string) => {
        const newTags = tags.filter((language) => language !== languageToRemove);
        setTags(newTags);
        form.setValue(name, newTags);
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

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((lang, index) => (
                                        <Badge key={index} variant="secondary" className="text-sm">
                                            {lang}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="ml-2 h-4 w-4 p-0"
                                                onClick={() => removeLanguage(lang)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-end gap-2">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="language">Language Select</Label>
                                        <Select value={inputValue} onValueChange={setInputValue}>
                                            <SelectTrigger id="language" className=" focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0">
                                                <SelectValue placeholder="Select Language" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[80]">
                                                {asianLanguages.map((language) => (
                                                    <SelectItem key={language.value} value={language.value}>
                                                        {language.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="proficiency">Proficiency Select</Label>
                                        <Select value={lanLevel} onValueChange={setLanLevel}>
                                            <SelectTrigger id="proficiency">
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent className=" z-[80] ">
                                                {languageProficiencyLevels.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="button" onClick={addLanguage} className="mb-px">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
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

export default FormLanguageAdd;





