import React, { Dispatch, SetStateAction } from "react";
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
import { UploadImages } from "@/api/common/upload-images";
import { UploadImage } from "@/api/common/upload-image";


type FormInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    id: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    multiple?: boolean;
    imageArray?: string[];
    setImageArray?: Dispatch<SetStateAction<string[]>>;
};

const FormInputFile: React.FC<FormInputProps> = ({
    form,
    name,
    label = "",
    id,
    description = "",
    placeholder = "",
    defaultValue = "",
    multiple,
    imageArray,
    setImageArray,
}) => {
    const postImage = async (image: Blob): Promise<string> => {
        const { imageUrl } = await UploadImage(image);
        return imageUrl;
    };

    const postImages = async (images: FileList) => {
        const fileArray: File[] = Array.from(images);
        const { imageUrls } = await UploadImages(fileArray);
        return imageUrls;
    };


    return (
        <>
            <div className=" my-3 hidden">
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            {label && (
                                <FormLabel className="mt-2 font-medium text-base leading-6 text-gray-900">
                                    {label}
                                </FormLabel>
                            )}
                            <FormControl>
                                <Input
                                    id={id}
                                    defaultValue={defaultValue}
                                    placeholder={placeholder}
                                    type="file"
                                    onChange={async (e) => {
                                        if (e.target.files) {
                                            if (multiple) {
                                                const imageUrls = await postImages(e.target.files);
                                                console.log(imageUrls);
                                                return field.onChange(imageUrls);
                                            }
                                            const imageUrl = await postImage(e.target.files[0]);
                                            if (setImageArray) {
                                                setImageArray((pre) => [...pre, imageUrl]);
                                            };
                                            field.onChange(imageUrl);
                                        }
                                    }}
                                    className="border-gray-300 border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 font-normal text-sm"
                                    multiple
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

export default FormInputFile;
