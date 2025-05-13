"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { AuthFormField } from "./form-field";
import { ZodSchema } from "zod";
import { ReactNode } from "react";

interface FormFieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface AuthFormProps<T extends Record<string, any>> {
  onSubmit: (data: T) => void;
  isLoading: boolean;
  error: string | null;
  schema: ZodSchema;
  defaultValues: T;
  fields: FormFieldConfig[];
  submitText: string;
  loadingText?: string;
  footer?: ReactNode;
}

export default function AuthForm<T extends Record<string, any>>({
  onSubmit,
  isLoading,
  error,
  schema,
  defaultValues,
  fields,
  submitText,
  loadingText,
  footer,
}: AuthFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <>
      {error && (
        <div className="w-full mt-2 col-span-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
          <Icons.alertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          {fields.map((fieldConfig) => (
            <AuthFormField
              key={fieldConfig.name}
              form={form}
              config={fieldConfig}
            />
          ))}

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {loadingText || "Processing..."}
                </>
              ) : (
                submitText
              )}
            </Button>
          </DialogFooter>

          {footer}
        </form>
      </Form>
    </>
  );
}
