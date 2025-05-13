"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

interface BackButtonProps {
  href?: string;
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function BackButton({
  href,
  label = "Back",
  variant = "outline",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button variant={variant} onClick={handleClick} className="mb-4 gap-2">
      <Icons.arrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
