"use client";

import React from 'react';
import { useIntersectionAnimation, useHoverAnimation } from '@/lib/hooks';
import styles from '@/lib/animations.module.css';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  animationDelay?: number;
  showGlowEffect?: boolean;
  showCornerDecoration?: boolean;
  showBackgroundGradient?: boolean;
  customHoverEffects?: React.ReactNode;
}

export function AnimatedCard({
  children,
  index = 0,
  className = '',
  animationDelay = 0,
  showGlowEffect = true,
  showCornerDecoration = true,
  showBackgroundGradient = true,
  customHoverEffects
}: AnimatedCardProps) {
  const intersectionRef = useIntersectionAnimation({
    animationDelay: animationDelay || index * 150
  });

  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();

  const baseClasses = `
    opacity-0 transform translate-y-8 
    bg-card rounded-xl shadow-lg p-6 
    border border-border 
    hover:shadow-xl transition-all duration-700 ease-out 
    hover:scale-[1.02] hover:border-primary/20 
    group relative overflow-hidden
  `;

  return (
    <div
      ref={intersectionRef}
      className={`${baseClasses} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient overlay on hover */}
      {showBackgroundGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Decorative corner element - hidden on mobile */}
      {showCornerDecoration && (
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0 hidden sm:block" />
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Custom hover effects */}
      {customHoverEffects}

      {/* Subtle glow effect on hover */}
      {showGlowEffect && (
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${styles.glow}`} />
      )}
    </div>
  );
} 