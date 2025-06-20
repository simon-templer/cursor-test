import React from "react";
import { content } from "@/config/content";
import { getTranslations } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { AnimatedProjectCard } from "@/components/AnimatedProjectCard";
import styles from './portfolio.module.css';

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

export default async function PortfolioPage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main className={`min-h-screen flex flex-col items-center px-4 py-8 sm:py-12 bg-background text-foreground relative overflow-hidden ${styles.portfolioContainer}`}>
      <section className="w-full max-w-4xl flex flex-col items-start relative z-10">
        {/* Animated title section */}
        <div className="w-full animate-in slide-in-from-top-4 duration-1000 ease-out">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal mb-2 text-left pt-8 sm:pt-12 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:to-secondary transition-all duration-500">
            {t('portfolio.title')}
          </h1>
          <hr className="border-t border-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 w-2/3 sm:w-1/2 mb-8 sm:mb-12 ml-0 animate-in slide-in-from-left-4 duration-1000 delay-300 ease-out" />
        </div>
        
        {/* Portfolio intro text */}
        <div className="w-full mb-8 sm:mb-12 animate-in fade-in duration-1000 delay-500">
          <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl">
            {(content as Content).portfolio.intro[locale]}
          </p>
        </div>
        
        {/* Projects grid with staggered animations */}
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {(content as Content).projects?.map((project, idx) => (
            <AnimatedProjectCard 
              key={idx} 
              project={project} 
              locale={locale} 
              index={idx}
            />
          ))}
        </div>
        
        {/* Enhanced decorative element at the bottom */}
        <div className="w-full mt-24 sm:mt-32 pt-8 sm:pt-12 pb-8 sm:pb-12 text-center animate-in fade-in duration-1000 delay-500">
          <div className="inline-block w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full mb-3 sm:mb-4"></div>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            {(content as Content).portfolio.endMessage[locale]}
          </p>
        </div>
      </section>
    </main>
  );
} 