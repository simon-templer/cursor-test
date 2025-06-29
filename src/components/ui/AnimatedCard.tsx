"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  showGlowEffect?: boolean;
  showCornerDecoration?: boolean;
  showBackgroundGradient?: boolean;
}

export function AnimatedCard({
  children,
  index = 0,
  className = '',
  showGlowEffect = true,
  showCornerDecoration = true,
  showBackgroundGradient = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        bg-card rounded-xl shadow-lg p-6 
        border border-border hover:shadow-xl
        hover:border-primary/20 
        group relative overflow-hidden
        ${className}
      `}
    >
      {/* Background gradient overlay on hover */}
      {showBackgroundGradient && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Decorative corner element - hidden on mobile */}
      {showCornerDecoration && (
        <motion.div 
          className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 hidden sm:block"
          initial={{ x: 16, y: -16 }}
          whileHover={{ x: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle glow effect on hover */}
      {showGlowEffect && (
        <motion.div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(0, 150, 136, 0.4)"
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
} 