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
import { LoginFormValues } from "@/lib/schemas/login";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/use-login";
import LoginForm from "./login-form";

export default function LoginDialog() {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: login, isPending: isLoading } = useLogin();

  function onSubmit(data: LoginFormValues) {
    setError(null);

    login(data, {
      onSuccess: () => {
        setError(null);
        setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
