import React from "react";
import { content } from "@/config/content";
import { getTranslations } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { AnimatedIntroText } from "@/components/AnimatedIntroText";
import { getSubElementDelay } from "@/lib/animations";
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
        <AnimatedIntroText locale={locale} />
        
        {/* Projects grid with staggered animations */}
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {(content as Content).projects?.map((project, idx) => (
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
                  <span 
                    key={tIdx} 
                    className="bg-muted/50 text-muted-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-mono border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default hover:scale-105 transform hover:shadow-sm"
                    style={{ animationDelay: `${getSubElementDelay(idx, tIdx)}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedCard>
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