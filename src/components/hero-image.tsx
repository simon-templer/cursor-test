"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      // Small delay to ensure smooth transition
      setTimeout(() => setIsVisible(true), 50);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 bg-background transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />
      
      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={90}
      />
    </div>
  );
} 