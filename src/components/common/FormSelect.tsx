import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type FormInputProps = {
  form: any;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  options: { name: string; value: string }[] | undefined;
};
const FormSelect = (props: FormInputProps) => {
  const { form, name, label, description, placeholder, options, defaultValue } =
    props;

  return (
    <div className="my-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mt-2 font-medium text-base leading-6 text-gray-900">
              {label}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <FormControl className=" border-2 border-blue-500">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>
              {description}
              {/* <Link href="/examples/forms">email settings</Link>. */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormSelect;
