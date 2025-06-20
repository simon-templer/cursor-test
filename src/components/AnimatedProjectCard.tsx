"use client";

import React, { useEffect, useRef } from "react";
import styles from '../app/[locale]/portfolio/portfolio.module.css';

type Locale = "en" | "de" | "fr" | "it";

type LocalizedString = {
  [key in Locale]: string;
};

type Project = {
  title: LocalizedString;
  timeframe: LocalizedString;
  role: LocalizedString;
  company: LocalizedString;
  description: LocalizedString;
  technologies: string[];
};

interface AnimatedProjectCardProps {
  project: Project;
  locale: Locale;
  index: number;
}

export function AnimatedProjectCard({ project, locale, index }: AnimatedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simply make the card visible with a smooth transition
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="opacity-0 transform translate-y-8 bg-card rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-2 border border-border hover:shadow-xl transition-all duration-700 ease-out hover:scale-[1.02] hover:border-primary/20 group relative overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Decorative corner element - hidden on mobile */}
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0 hidden sm:block"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300 group-hover:scale-105 transform">
            {project.title[locale]}
          </h2>
          <div className="hidden sm:block w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"></div>
        </div>
        
        <div className="text-xs sm:text-sm text-muted-foreground mb-3 flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">{project.company[locale]}</span>
          <span className="text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300 hidden sm:inline">•</span>
          <span className="group-hover:text-foreground/90 transition-colors duration-300">{project.timeframe[locale]}</span>
          <span className="text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300 hidden sm:inline">•</span>
          <span className="italic text-foreground/70 group-hover:text-primary/80 transition-colors duration-300">{project.role[locale]}</span>
        </div>
        
        <p className="mb-4 text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors duration-300 group-hover:leading-relaxed text-sm sm:text-base">
          {project.description[locale]}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
          {project.technologies.map((tech, tIdx) => (
            <span 
              key={tIdx} 
              className="bg-muted/50 text-muted-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-mono border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default hover:scale-105 transform hover:shadow-sm"
              style={{ animationDelay: `${(index * 150) + (tIdx * 50)}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${styles.glowEffect}`}></div>
    </div>
  );
} 