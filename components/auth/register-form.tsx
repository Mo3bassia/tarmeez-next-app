"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ImageIcon, Loader2 } from "lucide-react";
import { useRef } from "react";

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
  // Form refs and input handlers
  const nameInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create form data from inputs
    const formData = new FormData();

    if (nameInput.current?.value) {
      formData.append("name", nameInput.current.value);
    }

    if (usernameInput.current?.value) {
      formData.append("username", usernameInput.current.value);
    }

    if (passwordInput.current?.value) {
      formData.append("password", passwordInput.current.value);
    }

    if (emailInput.current?.value) {
      formData.append("email", emailInput.current.value);
    }

    if (imageInput.current?.files?.[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="w-full mt-2 mb-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
          <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="col-span-3"
            ref={nameInput}
            disabled={isLoading}
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="col-span-3"
            ref={usernameInput}
            disabled={isLoading}
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="col-span-3"
            ref={emailInput}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="col-span-3"
            ref={passwordInput}
            disabled={isLoading}
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="picture" className="text-right">
            Picture
          </Label>
          <div className="col-span-3">
            <label
              htmlFor="picture"
              className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/20"
            >
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Choose profile picture
              </span>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                ref={imageInput}
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
