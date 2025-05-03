"use client";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
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
  const image = useRef(null);
  const [isError, setIsError] = useState(false);
  const fallbackContent = (
    <AvatarFallback className="flex justify-center items-center">
      <User className={`w-${iconSize} h-${iconSize}  text-foreground/50`} />
    </AvatarFallback>
  );
  function handleError() {
    if (image.current) {
      image.current.style.display = "none";
    }
    setIsError(true);
  }
  return (
    <Avatar className={className}>
      {condition ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            ref={image}
            className="rounded-full object-cover w-full h-full"
            onError={handleError}
          />
        </>
      ) : (
        fallbackContent
      )}
      {isError && fallbackContent}
    </Avatar>
  );
}
