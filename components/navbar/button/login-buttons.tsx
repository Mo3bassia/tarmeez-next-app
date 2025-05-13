"use client";
import LoginDialog from "../../auth/login-dialog";
import RegisterDialog from "../../auth/register-dialog";
import { useCheckLogin } from "@/hooks/use-check-login";
import Logout from "../../auth/logout";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ProfileAvatar from "@/components/common/profile-avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function LoginButtons() {
  const { data, isLoading } = useCheckLogin();
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const user = data?.userData?.user;
  const isLoggedIn = !!data?.userData?.token && !!user;

  if (isLoading) {
    return (
      <div className="flex gap-1 items-center">
        <Button variant="outline" disabled className="flex items-center gap-2">
          <Icons.loader2 className="h-4 w-4 animate-spin" />
          <span>Checking...</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative h-8 w-8 rounded-full cursor-pointer hover:opacity-80 flex items-center justify-center">
            <ProfileAvatar
              iconSize={5}
              className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
              condition={
                typeof user?.profile_image === "string" &&
                user?.profile_image !== ""
              }
              src={user?.profile_image || ""}
              alt={isLoggedIn ? user.name : "User Avatar"}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {isLoggedIn ? (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`/users/${user.id}`}>
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              {/* Theme selector with submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icons.sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Icons.sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                    {theme === "light" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Icons.moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                    {theme === "dark" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Icons.laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                    {theme === "system" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(false);
                  document.getElementById("logout-button")?.click();
                }}
              >
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(false);
                  setShowLoginDialog(true);
                }}
              >
                <Icons.login className="mr-2 h-4 w-4" />
                <span>Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(false);
                  setShowRegisterDialog(true);
                }}
              >
                <Icons.userPlus className="mr-2 h-4 w-4" />
                <span>Register</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* Theme selector for non-logged in users */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icons.sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Icons.sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                    {theme === "light" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Icons.moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                    {theme === "dark" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Icons.laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                    {theme === "system" && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden components for actions */}
      <div className="hidden">
        <LoginDialog
          isOpen={showLoginDialog}
          onOpenChange={setShowLoginDialog}
        />
        <RegisterDialog
          isOpen={showRegisterDialog}
          onOpenChange={setShowRegisterDialog}
        />
        <div id="logout-container">
          <Logout>
            <span id="logout-button" className="hidden">
              Logout
            </span>
          </Logout>
        </div>
      </div>
    </div>
  );
}
