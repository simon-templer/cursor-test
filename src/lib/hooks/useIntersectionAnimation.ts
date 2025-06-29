"use client";

import { useEffect, useRef } from 'react';

interface UseIntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationDelay?: number;
  onIntersect?: () => void;
}

export function useIntersectionAnimation(options: UseIntersectionAnimationOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationDelay = 0,
    onIntersect
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation delay if specified
            if (animationDelay > 0) {
              setTimeout(() => {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                onIntersect?.();
              }, animationDelay);
            } else {
              entry.target.classList.remove('opacity-0', 'translate-y-8');
              entry.target.classList.add('opacity-100', 'translate-y-0');
              onIntersect?.();
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, animationDelay, onIntersect]);

  return elementRef;
} 