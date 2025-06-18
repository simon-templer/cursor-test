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
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-4xl flex flex-col items-start">
        <h1 className="text-5xl font-serif font-normal mb-2 text-left pt-12">{about.title[locale]}</h1>
        <hr className="border-t border-gray-300 dark:border-gray-500 w-1/2 mb-12 ml-0" />
        <h2 className="text-2xl text-muted-foreground mb-12 text-left">{t('subheader')}</h2>
        
        {/* About Text Section */}
        <div className="w-full mb-24">
          <div>
            <p className="text-base text-muted-foreground mb-4 text-left">{about.aboutText[locale]}</p>
          </div>
        </div>

        {/* Work Timeline */}
        <div className="w-full mb-24">
          <WorkTimeline timeline={about.workTimeline} t={t} locale={locale} />
        </div>

        {/* Bare Skills Bar Diagram */}
        <div className="w-full mb-24">
          <SkillsBarSection skills={about.bareSkills} t={t} locale={locale} />
        </div>

        {/* Capabilities Section */}
        <div className="w-full mb-24">
          <Capabilities capabilities={about.capabilities} t={t} locale={locale} />
        </div>

        {/* Skills & Tools Section */}
        <div className="w-full">
          <SkillsAndTools categories={about.skillsAndTools.categories} t={t} locale={locale} />
        </div>
      </div>
    </main>
  );
} 