import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormFieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface AuthFormFieldProps {
  form: UseFormReturn<any>;
  config: FormFieldConfig;
}

export function AuthFormField({ form, config }: AuthFormFieldProps) {
  const { name, label, type = "text", placeholder, disabled } = config;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <FormControl className="col-span-3">
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="col-span-3 col-start-2" />
        </FormItem>
      )}
    />
  );
}
