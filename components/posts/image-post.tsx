"use client";
import Image from "next/image";
import { useRef } from "react";

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
  function handleError() {
    image.current.parentElement.style.display = "none";
  }
  return (
    <Image
      className={className}
      fill
      alt={alt}
      src={src}
      ref={image}
      onError={() => handleError()}
    ></Image>
  );
}
