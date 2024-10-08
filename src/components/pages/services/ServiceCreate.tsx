"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Upload, DollarSign, Clock, Tag, PenSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInputFile from "@/components/common/FormInputFile";
import FormTags from "@/components/common/FormTags";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { useCreateServiceByClinic } from "@/api/service/create-service-by-clinic";
import Image from "next/image";

export default function CreateService() {
  const [open, setOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { mutate } = useCreateServiceByClinic();
  const form = useForm();

  const handleSubmitForm = (values: any) => {
    const payload = {
      ...values,
      isPublished: isPublished,
      price: Number(values.price),
      duration: Number(values.duration),
    };
    console.log(payload);
    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset({
          name: '',
          price: '',
          description: '',
          duration: '',
          isPublished: false,
          tags: [],
          thumbnailUrl: ''
        })
      },
    });
  };

  const serviceImage = form.watch("thumbnailUrl");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><PenSquare className="mr-2 h-4 w-4" /> Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>
            Fill in the details for your new service. Click save when you&apo;re
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
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormInput form={form} name="name" label="Service Name" placeholder="Enter your service name..." />
              </div>
              <div className="space-y-2">
                <FormTextarea
                  form={form}
                  name="description"
                  label="Description"
                  placeholder="say something about your service...."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormInput
                  form={form}
                  name="price"
                  label="Price"
                  type="number"
                  placeholder="5000 ks"
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  form={form}
                  name="duration"
                  type="number"
                  label="Duration(minutes)"
                  placeholder="30 minutes"
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormTags form={form} name="tags" label="tags" />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Save Service
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
