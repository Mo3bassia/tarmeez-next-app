"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function ProfileAvatar({
  src,
  alt,
  condition,
  className,
  iconSize,
}: {
  src: string;
  alt: string;
  condition: boolean;
  className: string;
  iconSize: number;
}) {
  const [isError, setIsError] = useState(false);

  const fallbackContent = (
    <AvatarFallback className="flex justify-center items-center">
      <Icons.user className={`w-${iconSize} h-${iconSize} text-foreground/50`} />
    </AvatarFallback>
  );

  // Show fallback when condition is false or we have an error
  if (!condition || isError) {
    return <Avatar className={className}>{fallbackContent}</Avatar>;
  }

  // When condition is true and no error has occurred
  return (
    <Avatar className={className}>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        unoptimized
        className="rounded-full object-cover w-full h-full"
        onError={() => setIsError(true)}
      />
      {/* Render fallback if image fails to load */}
      {isError && fallbackContent}
    </Avatar>
  );
}
