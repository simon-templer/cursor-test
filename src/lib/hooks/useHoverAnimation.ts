"use client";

import { useState } from 'react';

interface UseHoverAnimationOptions {
  onHoverEnter?: () => void;
  onHoverLeave?: () => void;
}

export function useHoverAnimation(options: UseHoverAnimationOptions = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const { onHoverEnter, onHoverLeave } = options;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverLeave?.();
  };

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave
  };
} 