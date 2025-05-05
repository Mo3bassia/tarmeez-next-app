"use client";

import { Button } from "@/components/ui/button";
import { useCheckLogin } from "@/hooks/use-check-login";
import { useLogout } from "@/hooks/use-logout";

export default function Logout({ children }: { children: React.ReactNode }) {
  const { data: authToken } = useCheckLogin();
  const { mutate: logout, isPending: isLoading } = useLogout();

  function handleLogout() {
    logout({ token: authToken.userData.token });
  }

  return (
    <div>
      <Button disabled={isLoading} onClick={() => handleLogout()}>
        {children}
      </Button>
    </div>
  );
}
