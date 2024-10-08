"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Plus,
  Image as ImageIcon,
  Tag as TagIcon,
  Edit3,
  Eye,
  Save,
  Send,
} from "lucide-react";
import BlogFormInput from "@/components/common/BlogFormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import QuillEditor from "@/components/common/quill-text-form";
import FormTags from "@/components/common/FormTags";
import FormInputFile from "@/components/common/FormInputFile";
import { useLocalstorage } from "@/lib/helpers";
import { useCreatePost } from "@/api/post/create-post-by-clinic";
import Image from "next/image";

// Note: You would need to install and import a rich text editor library
// For this example, we'll use a placeholder component
const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Textarea
    placeholder="Write your blog content here..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="min-h-[calc(100vh-300px)] resize-none"
  />
);

export default function BlogCreate() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { getData } = useLocalstorage();
  const { mutate } = useCreatePost();
  const form = useForm();
  const clinic = getData("clinic");

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  const handleSubmitPublic = (values: any) => {
    const payload = {
      ...values,
      content: content,
      images: images,
      isPublished: true,
      userId: clinic.id,
    };
    console.log(payload);
    mutate(payload);
  };
  const handleSubmitDraft = (values: any) => {
    const payload = {
      ...values,
      content: content,
      images: images,
      isPublished: false,
      userId: clinic.id,
    };
    console.log(payload);
    mutate(payload);
  };

  const imageArray: string[] = form.watch("images");

  useEffect(() => {
    if (imageArray) {
      setImages([...images, ...imageArray]);
    }
  }, [imageArray, images]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={form.handleSubmit(handleSubmitDraft)}
              type="button"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmitPublic)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <BlogFormInput
                    form={form}
                    name="title"
                    placeholder="Enter your blog title"
                    className="text-2xl font-semibold border-none px-0 focus-visible:ring-0 "
                  />
                  <Separator className="my-6" />
                  <div className="">
                    <div className=" mx-auto ">
                      <QuillEditor
                        setContent={setContent}
                        placeholder="Write your blog content here..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <TagIcon className="w-5 h-5 mr-2" />
                    Tags
                  </h2>
                  <FormTags form={form} name="tags" placeholder="Add tags" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Images
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {images?.map((image, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden"
                      >
                        <Image
                          width={300}
                          height={300}
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleRemoveImage(image)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <label
                      htmlFor="thumbnailUrl"
                      className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer h-32 hover:bg-gray-50 transition-colors"
                    >
                      <FormInputFile
                        form={form}
                        name="images"
                        id="thumbnailUrl"
                        multiple
                      />
                      <div className="text-center">
                        <Plus className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm font-medium text-gray-700">
                          Add Images
                        </span>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
