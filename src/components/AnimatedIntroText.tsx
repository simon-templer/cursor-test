"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from 'next-intl';
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

export function AnimatedIntroText() {
  const locale = useLocale() as Locale;

  return (
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
  );
} 