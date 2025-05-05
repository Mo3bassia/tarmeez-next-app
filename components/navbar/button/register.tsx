"use client";
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
import { useRegister } from "@/hooks/use-register";
import { RegisterCredentials } from "@/lib/schemas/register";
import { AlertCircle, ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Register() {
  const [nameVal, setNameVal] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const imageInput = useRef(null);

  const { mutate: register, isPending: isLoading } = useRegister();

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);

    const registerCredentials = {
      name: nameVal,
      username,
      password,
      email,
      image: imageInput.current.files[0],
    };
    console.log(imageInput.current.files[0]);
    if (!email) delete registerCredentials.email;
    if (!imageInput.current.files[0]) delete registerCredentials.image;

    console.log(registerCredentials);

    const check = RegisterCredentials.safeParse(registerCredentials);
    if (!check.success) {
      setErrors(
        "Enter a valid username and at least 6 characters for password"
      );
    } else {
      register(registerCredentials, {
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
            "Register"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>
              Enter your information to create a new account
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
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="col-span-3"
                name="name"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
              />
            </div>
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
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="col-span-3"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    name="image"
                    ref={imageInput}
                  />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
