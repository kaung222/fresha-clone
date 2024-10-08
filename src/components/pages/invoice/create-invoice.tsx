import { useCreateInvoice } from "@/api/invoice/create-invoice";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CreateInvoiceSchema } from "@/validation-schema/create-invoice.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateInvoice = () => {
  const { mutate } = useCreateInvoice();
  type CreateInvoiceFormData = z.infer<typeof CreateInvoiceSchema>;
  const form = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(CreateInvoiceSchema),
  });

  const createInvoice = (values: CreateInvoiceFormData) => {
    mutate(values, { onSuccess: () => form.reset() });
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createInvoice)}
          className=" flex flex-wrap gap-3"
        >
          <FormInput
            name="name"
            form={form}
            placeholder="Invoice name"
            label="Invoice Name"
          />
          <FormInput
            name="price"
            form={form}
            placeholder="Price"
            type="number"
            label="Price"
          />
          <FormInput
            name="quantity"
            type="number"
            form={form}
            placeholder="Quantity"
            label="Quantity"
          />
          <FormInput
            name="description"
            form={form}
            placeholder="Enter description ..."
            label="Description (optional)"
          />
          <FormInput
            name="createdAt"
            type="date"
            form={form}
            label="Date (optional)"
          />
          <Button className=" bg-button  w-[200px]">Add</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoice;
