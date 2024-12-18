'use client'
import React, { Dispatch, SetStateAction, useState } from "react";
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
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../ui/button";


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
    aspectRatio?: number;
    setImageArray?: Dispatch<SetStateAction<string[]>>;
};

const FormInputFileCrop: React.FC<FormInputProps> = ({
    form,
    name,
    label = "",
    id,
    description = "",
    placeholder = "",
    defaultValue = "",
    aspectRatio = 1 / 1,
    imageArray,
    setImageArray,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cropper, setCropper] = useState<any>(null);
    const [isCropperVisible, setIsCropperVisible] = useState(false);

    // const postImage = async (image: Blob): Promise<string> => {
    //     const { imageUrl } = await UploadImage(image);
    //     return imageUrl;
    // };

    const postImage = async (image: Blob, fileName: string): Promise<string> => {
        const jpgFile = new File([image], `${fileName}.jpg`, { type: "image/jpeg" });
        const { imageUrl } = await UploadImage(jpgFile);
        return imageUrl;
    };

    // const postImages = async (images: FileList) => {
    //     const fileArray: File[] = Array.from(images);
    //     const { imageUrls } = await UploadImages(fileArray);
    //     return imageUrls;
    // };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.includes("image")) {
                alert("Please select a valid image file");
                return;
            }
            setSelectedFile(file);
            setIsCropperVisible(true);
            e.target.value = ""; // Reset input to prevent re-triggering on the same file
        }
    };

    const handleCrop = async () => {
        if (cropper && selectedFile) {
            const croppedCanvas = cropper.getCroppedCanvas({
                width: 800, // Resize dimensions if needed
                height: 800,
            });

            croppedCanvas.toBlob(
                async (blob: Blob | null) => {
                    if (blob) {
                        const fileNameWithoutExtension = selectedFile.name.split(".")[0];
                        const imageUrl = await postImage(blob, fileNameWithoutExtension);
                        form.setValue(name, imageUrl); // Update form field value
                        if (setImageArray) {
                            setImageArray((prev) => [...prev, imageUrl]);
                        }
                        setIsCropperVisible(false); // Hide the cropper
                    }
                },
                "image/jpeg",
                1.0 // Quality (1.0 = max)
            );
        }
    };

    // const handleCrop = async () => {
    //     if (cropper) {
    //         const croppedCanvas = cropper.getCroppedCanvas();
    //         croppedCanvas.toBlob(async (blob: Blob | null) => {
    //             if (blob) {
    //                 const imageUrl = await postImage(blob);
    //                 form.setValue(name, imageUrl); // Update form field value
    //                 if (setImageArray) {
    //                     setImageArray((prev) => [...prev, imageUrl]);
    //                 }
    //                 setIsCropperVisible(false); // Hide the cropper
    //             }
    //         });
    //     }
    // };

    return (
        <>
            <div className=" my-3 hidden">
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            {label && (
                                <FormLabel htmlFor={id} className="mt-2 font-medium text-base leading-6 text-gray-900">
                                    {label}
                                </FormLabel>
                            )}
                            <FormControl>
                                <Input
                                    id={id}
                                    defaultValue={defaultValue}
                                    placeholder={placeholder}
                                    type="file"
                                    disabled={isCropperVisible}
                                    onChange={handleFileChange}
                                    className="border-gray-300 border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 font-normal text-sm"
                                />
                            </FormControl>
                            {description && <FormDescription>{description}</FormDescription>}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {isCropperVisible && selectedFile && (
                <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded shadow-lg">
                        <Cropper
                            src={URL.createObjectURL(selectedFile)}
                            style={{ height: 400, width: "100%" }}
                            initialAspectRatio={16 / 9}
                            aspectRatio={aspectRatio}
                            guides={false}
                            onInitialized={(instance) => setCropper(instance)}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button type="button" onClick={() => setIsCropperVisible(false)}>Cancel</Button>
                            <Button type="button" onClick={handleCrop}>Crop & Upload</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormInputFileCrop;
