"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  // Estado para manejar URLs de respaldo en caso de error
  const [urls, setUrls] = useState(avatarUrls);

  // Sincronizar el estado 'urls' con 'avatarUrls' cuando 'avatarUrls' cambie
  useEffect(() => {
    setUrls(avatarUrls);
  }, [avatarUrls]);

  // Función que actualiza una URL a la imagen de respaldo si falla
  const handleError = (index: number) => {
    setUrls((prevUrls) =>
      prevUrls.map((url, i) => (i === index ? "/unknow.webp" : url))
    );
  };

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {urls.map((url, index) => (
        <Image
          key={index}
          className="h-11 w-11 rounded-full border-2 border-white dark:border-gray-900"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
          unoptimized
          onError={() => handleError(index)} // Maneja el error para cada avatar individualmente
        />
      ))}
      {numPeople ? (
        <a
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-neutral-900/60 to-neutral-900/60 backdrop-blur-sm text-center text-xs font-bold text-white hover:bg-gray-600/40 dark:border-gray-900 dark:text-black dark:bg-gradient-to-b dark:from-neutral-50/40 dark:to-neutral-50/40"
          href="#"
        >
          +{numPeople}
        </a>
      ) : null}
    </div>
  );
};

export default AvatarCircles;
