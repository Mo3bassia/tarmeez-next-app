"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRegister } from "@/hooks/use-register";
import { Loader2 } from "lucide-react";
import RegisterForm from "./register-form";

export default function RegisterDialog() {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: register, isPending: isLoading } = useRegister();

  const handleSubmit = (formData: FormData) => {
    setError(null);

    register(formData, {
      onSuccess: () => {
        setError(null);
        setIsOpen(false);
      },
      onError: (error: any) => {
        setError(
          error.response?.data?.message ||
            "Registration failed. Please check your information."
        );
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Wait...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Enter your information to create a new account
          </DialogDescription>
        </DialogHeader>

        <RegisterForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
}
