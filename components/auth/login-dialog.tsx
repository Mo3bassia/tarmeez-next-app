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
import { LoginFormValues } from "@/lib/validations/login";
import { Icons } from "@/components/icons";
import { useLogin } from "@/hooks/use-login";
import LoginForm from "./login-form";

interface LoginDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LoginDialog({
  isOpen,
  onOpenChange,
}: LoginDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const { mutate: login, isPending: isLoading } = useLogin();

  function onSubmit(data: LoginFormValues) {
    setError(null);

    login(data, {
      onSuccess: () => {
        setError(null);
        setOpen(false);
      },
      onError: (error: any) => {
        setError(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <>
              <Icons.loader2 className="h-4 w-4 mr-2 animate-spin" />
              Wait...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>

        <LoginForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </DialogContent>
    </Dialog>
  );
}
