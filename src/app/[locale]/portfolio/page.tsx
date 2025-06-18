import React from "react";
import { content } from "@/config/content";
import { getTranslations } from 'next-intl/server';
import { routing } from "@/i18n/routing";

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
};

export default async function PortfolioPage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-background text-foreground">
      <section className="w-full max-w-6xl flex flex-col items-start">
        <h1 className="text-5xl font-serif font-normal mb-2 text-left pt-12">{t('portfolio.title')}</h1>
        <hr className="border-t border-gray-300 dark:border-gray-500 w-1/2 mb-8 ml-0" />
        <div className="w-full flex flex-col gap-8">
          {(content as Content).projects?.map((project, idx) => (
            <div key={idx} className="bg-card rounded-xl shadow-lg p-8 flex flex-col gap-2 border border-border">
              <h2 className="text-2xl font-bold mb-1">{project.title[locale]}</h2>
              <div className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">{project.company[locale]}</span> &mdash; {project.timeframe[locale]} &mdash; <span className="italic">{project.role[locale]}</span>
              </div>
              <p className="mb-3 text-foreground/80 leading-relaxed">{project.description[locale]}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-mono border border-border">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 