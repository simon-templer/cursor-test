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
    <div className="relative w-full h-full overflow-hidden">
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 bg-background transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />
      
      {/* Mobile: Portrait orientation, minimal cropping */}
      <div className="block sm:hidden relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Tablet: Landscape orientation, moderate cropping */}
      <div className="hidden sm:block lg:hidden relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="(max-width: 1024px) 50vw, 33vw"
          quality={90}
        />
      </div>

      {/* Desktop 24-inch: Optimized cropping for desktop viewing */}
      <div className="hidden lg:block xl:hidden relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="(max-width: 1280px) 50vw, 40vw"
          quality={95}
        />
      </div>

      {/* Large Desktop 24+ inch: Full experience with minimal cropping */}
      <div className="hidden xl:block relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="(max-width: 1536px) 40vw, 35vw"
          quality={95}
        />
      </div>
    </div>
  );
} 