"use client";

import React, { useEffect, useRef } from "react";
import { content } from "@/config/content";

type Locale = "en" | "de" | "fr" | "it";

type LocalizedString = {
  [key in Locale]: string;
};

type Content = {
  portfolio: {
    intro: LocalizedString;
  };
};

interface AnimatedIntroTextProps {
  locale: Locale;
}

export function AnimatedIntroText({ locale }: AnimatedIntroTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simply make the text visible with a smooth transition
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={textRef}
      className="w-full mb-8 sm:mb-12 opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
    >
      <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl">
        {(content as Content).portfolio.intro[locale]}
      </p>
    </div>
  );
} 