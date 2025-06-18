"use client";
import { content } from '@/config/content';
import { useTranslations } from 'next-intl';
import React from 'react';
import { WorkTimeline } from '@/components/about/WorkTimeline';
import { SkillsBarSection } from '@/components/about/SkillsBar';
import { Capabilities } from '@/components/about/Capabilities';
import { SkillsAndTools } from '@/components/about/SkillsAndTools';

export default function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'de' | 'fr' | 'it' }> }) {
  const { locale } = React.use(params);
  const t = useTranslations('about');
  const about = content.about;

  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground transition-colors">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-24 px-4 py-12">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-serif font-normal mb-2 text-left pt-12">{about.title[locale]}</h1>
          <hr className="border-t border-gray-300 dark:border-gray-500 w-1/2 mb-8 ml-0" />
        </div>
        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl mb-8">{t('subheader')}</h2>
          </div>
          <div>
            <p className="text-base text-muted-foreground mb-4">{about.aboutText[locale]}</p>
          </div>
        </div>
        {/* Work Timeline */}
        <WorkTimeline timeline={about.workTimeline} t={t} locale={locale} />
        {/* Bare Skills Bar Diagram */}
        <SkillsBarSection skills={about.bareSkills} t={t} locale={locale} />
        {/* Capabilities Section */}
        <Capabilities capabilities={about.capabilities} t={t} locale={locale} />
        {/* Skills & Tools Section */}
        <SkillsAndTools categories={about.skillsAndTools.categories} t={t} locale={locale} />
      </div>
    </main>
  );
} 