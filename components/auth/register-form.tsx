"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  error: string | null;
}

export default function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("password", values.password);

    if (values.email && values.email.trim() !== "") {
      formData.append("email", values.email);
    }

    if (imageInput.current?.files?.[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : null);
  };

  return (
    <>
      {error && (
        <div className="w-full mt-2 mb-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
          <Icons.alertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Full Name</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Username</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Email{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    type="email"
                    placeholder="Enter your email (optional)"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Password</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Picture{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <div className="col-span-3">
              <label
                htmlFor="picture"
                className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/20"
              >
                <Icons.imageIcon className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {selectedFileName || "Choose profile picture"}
                </span>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={imageInput}
                  disabled={isLoading}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
