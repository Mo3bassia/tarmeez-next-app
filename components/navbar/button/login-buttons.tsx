"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import Login from "./login";
import Register from "./register";

export default function LoginButtons() {
  const [isLogined, setIsLogined] = useLocalStorage(false, "isAuthenticated");
  console.log(isLogined);
  return (
    <div className="flex gap-1 items-center">
      {isLogined ? (
        <Button>Logout</Button>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}
