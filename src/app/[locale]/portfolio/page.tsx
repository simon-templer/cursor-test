"use client";

import React from "react";
import { content } from "@/config/content";
import { useTranslations, useLocale } from 'next-intl';
import { routing } from "@/i18n/routing";
import { PortfolioContent } from "./PortfolioContent";
import { motion } from "framer-motion";

type Locale = typeof routing.locales[number];

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

type Content = {
  projects: Project[];
  portfolio: {
    intro: LocalizedString;
    endMessage: LocalizedString;
  };
};

export default function PortfolioPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12 bg-background text-foreground relative overflow-hidden">
      <section className="w-full max-w-4xl flex flex-col items-start relative z-10">
        {/* Animated title section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal mb-2 text-left pt-8 sm:pt-12 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:to-secondary transition-all duration-500">
            {t('portfolio.title')}
          </h1>
          <motion.hr 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="border-t border-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 w-2/3 sm:w-1/2 mb-8 sm:mb-12 ml-0"
          />
        </motion.div>
        
        {/* Portfolio intro text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut"
          }}
          className="w-full mb-8 sm:mb-12"
        >
          <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl">
            {(content as Content).portfolio.intro[locale]}
          </p>
        </motion.div>
        
        {/* Projects grid with Framer Motion animations */}
        <PortfolioContent projects={(content as Content).projects} />
        
        {/* Enhanced decorative element at the bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full mt-24 sm:mt-32 pt-8 sm:pt-12 pb-8 sm:pb-12 text-center"
        >
          <div className="inline-block w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full mb-3 sm:mb-4"></div>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            {(content as Content).portfolio.endMessage[locale]}
          </p>
        </motion.div>
      </section>
    </main>
  );
} 