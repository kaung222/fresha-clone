"use client";
import { useUpdateServiceByClinic } from "@/api/service/update-service";
import FormInput from "@/components/common/FormInput";
import FormInputFile from "@/components/common/FormInputFile";
import FormTags from "@/components/common/FormTags";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Service } from "@/types/service";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSlice } from "./../../../store/slices/email.slice";
import Image from "next/image";

type Props = {
  data: Service;
};

const EditService = ({ data }: Props) => {
  const [isPublished, setIsPublished] = useState(data.isPublished);
  const [selectedTag, setSelectedTag] = useState<String[]>(data.tags);
  const { mutate } = useUpdateServiceByClinic(data.id);
  const form = useForm({
    defaultValues: {
      thumbnailUrl: data.thumbnailUrl,
      name: data.name,
      price: data.price,
      duration: data.duration,
      description: data.description,
      tags: data.tags,
      isPublished: data.isPublished,
    },
  });

  const handleSubmitForm = (values: any, event: any) => {
    const payload = {
      ...values,
      isPublished: isPublished,
      duration: Number(values.duration),
      price: Number(values.price),
    };
    mutate(payload);
  };

  const serviceImage: string = form.watch("thumbnailUrl");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Service</DialogTitle>
        <DialogDescription>
          Fill in the details for your new service. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {serviceImage ? (
                    <Image
                      width={300}
                      height={300}
                      src={serviceImage}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Service Thumbnail</h3>
                  <p className="text-sm text-muted-foreground">
                    {serviceImage ? "" : "No file selected"}
                  </p>
                </div>
              </div>
              <FormInputFile
                form={form}
                name="thumbnailUrl"
                id="serviceImage"
              />
              <Button type="button" variant="outline" size="sm">
                <Label htmlFor="serviceImage">Choose File</Label>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublished" className="font-semibold">
                Published
              </Label>
              <Switch
                id="isPublished"
                name="isPublished"
                checked={isPublished}
                onCheckedChange={(e) => setIsPublished(e)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormInput form={form} name="name" label="Service Name" />
            </div>
            <div className="space-y-2">
              <FormTextarea
                form={form}
                name="description"
                label="Description"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormInput form={form} name="price" label="Price" type="number" />
            </div>
            <div className="space-y-2">
              <FormInput
                form={form}
                name="duration"
                type="number"
                label="Duration(minutes)"
              />
            </div>
          </div>
          <div className="space-y-2">
            <FormTags
              form={form}
              name="tags"
              label="tags"
              defaultValue={data.tags}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmitForm)}
              className="w-full"
            >
              Edit Service
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditService;
