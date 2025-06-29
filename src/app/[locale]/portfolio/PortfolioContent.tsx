"use client";

import React from "react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { motion } from "framer-motion";

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

interface PortfolioContentProps {
  projects: Project[];
  locale: Locale;
}

export function PortfolioContent({ projects, locale }: PortfolioContentProps) {
  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16">
      {projects?.map((project, idx) => (
        <AnimatedCard 
          key={idx} 
          index={idx}
          className="sm:p-8 flex flex-col gap-2"
        >
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
              <motion.span 
                key={tIdx} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (idx * 0.1) + (tIdx * 0.05),
                  duration: 0.3,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-muted/50 text-muted-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-mono border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default hover:shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
} 