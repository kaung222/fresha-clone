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
  required?: boolean;
  emptyOptionComponent?: React.ReactNode;
};
const FormSelect = (props: FormInputProps) => {
  const { form, name, label, description, placeholder, options, defaultValue, required, emptyOptionComponent } =
    props;

  return (
    <div className="">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="">
              {label} {required && (<span className=" text-delete">**</span>)}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <FormControl className=" focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="z-[80]">
                {options?.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  );
                })}
                {emptyOptionComponent}
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
