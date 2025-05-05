"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoginCredentials } from "@/lib/schemas/login";
import { AlertCircle, Loader2 } from "lucide-react";
import { useLogin } from "@/hooks/use-login";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: login, isPending: isLoading } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);

    const loginCredentials = {
      username,
      password,
    };

    const check = LoginCredentials.safeParse(loginCredentials);
    if (!check.success) {
      setErrors(
        "Enter a valid username and at least 6 characters for password"
      );
    } else {
      login(loginCredentials, {
        onSuccess: (result) => {
          setErrors(null);
          setIsOpen(false);
        },
        onError: (error) => {
          setErrors(
            error.response?.data?.message ||
              "Login failed. Please check your credentials."
          );
        },
      });
    }
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
            "Login"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account
            </DialogDescription>

            {error && (
              <div className="w-full mt-2 col-span-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                name="password"
                placeholder="********"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col flex-wrap">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
