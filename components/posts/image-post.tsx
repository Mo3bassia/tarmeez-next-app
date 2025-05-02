"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImagePost({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const image = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleError() {
    if (image.current?.parentElement) {
      image.current.parentElement.style.display = "none";
      image.current.parentElement.remove();
    }
  }

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-md animate-pulse" />
      )}
      <Image
        className={`${className} ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }`}
        fill
        alt={alt}
        src={src || "https://dummyimage.com/300/09f/fff.png"}
        ref={image}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  );
}
