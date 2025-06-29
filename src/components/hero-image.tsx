"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background"
          />
        )}
      </AnimatePresence>
      
      {/* Mobile: Portrait orientation, minimal cropping */}
      <div className="block sm:hidden relative w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            quality={85}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      </div>

      {/* Tablet: Landscape orientation, moderate cropping */}
      <div className="hidden sm:block lg:hidden relative w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1024px) 50vw, 33vw"
            quality={90}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      </div>

      {/* Desktop 24-inch: Optimized cropping for desktop viewing */}
      <div className="hidden lg:block xl:hidden relative w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1280px) 50vw, 40vw"
            quality={95}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      </div>

      {/* Large Desktop 24+ inch: Full experience with minimal cropping */}
      <div className="hidden xl:block relative w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1536px) 40vw, 35vw"
            quality={95}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      </div>
    </div>
  );
} 