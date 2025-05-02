"use client";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Image from "next/image";

export default function ProfileAvatar({
  src,
  alt,
  condition,
}: {
  src: string;
  alt: string;
  condition: boolean;
}) {
  const image = useRef(null);
  const [isError, setIsError] = useState(false);
  const fallbackContent = (
    <AvatarFallback className="">
      <User className="w-5 h-5 text-foreground/50" />
    </AvatarFallback>
  );
  function handleError() {
    if (image.current) {
      image.current.style.display = "none";
    }
    setIsError(true);
  }
  return (
    <Avatar className="h-10 w-10 rounded-full ring-2 ring-primary/10 flex items-center justify-center">
      {condition ? (
        <>
          <Image
            width={40}
            height={40}
            src={src}
            alt={alt}
            ref={image}
            className="rounded-full object-cover w-10 h-10"
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
