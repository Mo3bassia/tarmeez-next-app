"use client";

import { LoginCredentials, LoginFormValues } from "@/lib/schemas/login";
import AuthForm from "./auth-form";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading: boolean;
  error: string | null;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  // Form field configurations
  const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      disabled: isLoading,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
      disabled: isLoading,
    },
  ];

  return (
    <AuthForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      schema={LoginCredentials}
      defaultValues={{ username: "", password: "" }}
      fields={fields}
      submitText="Sign In"
      loadingText="Signing in..."
    />
  );
}
