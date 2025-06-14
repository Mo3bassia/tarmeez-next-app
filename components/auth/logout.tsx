"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useState } from "react";
import LogoutDialog from "./logout-dialog";

export default function Logout({ children }: { children: React.ReactNode }) {
  const { mutate: logout, isPending: isLoading } = useLogout();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsDialogOpen(false);
  }

  return (
    <>
      <Button disabled={isLoading} onClick={() => setIsDialogOpen(true)}>
        {children}
      </Button>

      <LogoutDialog
        isOpen={isDialogOpen}
        isLoading={isLoading}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleLogout}
      />
    </>
  );
}
