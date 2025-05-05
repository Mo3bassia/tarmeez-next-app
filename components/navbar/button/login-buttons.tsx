"use client";
import Login from "./login";
import Register from "./register";
import { useCheckLogin } from "@/hooks/use-check-login";
import Logout from "./logout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ProfileAvatar from "@/components/common/profile-avatar";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginButtons() {
  const { data, isLoading } = useCheckLogin();

  if (isLoading) {
    return (
      <div className="flex gap-1 items-center">
        <Button variant="outline" disabled className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Checking...</span>
        </Button>
      </div>
    );
  }

  const user = data?.userData?.user;

  return (
    <div className="flex gap-2 items-center">
      {data?.userData?.token && user && (
        <div className="flex items-center gap-3 mr-1">
          <Link
            href={`/users/${user.id}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ProfileAvatar
              iconSize={5}
              className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
              condition={
                typeof user.profile_image === "string" &&
                user.profile_image !== ""
              }
              src={
                typeof user.profile_image === "string" ? user.profile_image : ""
              }
              alt={user.name}
            />
            <span className="text-sm font-medium hidden sm:inline">
              {user.name}
            </span>
          </Link>
        </div>
      )}

      {data?.userData?.token ? (
        <Logout>Logout</Logout>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}
