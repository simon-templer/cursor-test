"use client";
import { content } from '@/config/content';
import { useTranslations } from 'next-intl';
import React from 'react';
import { WorkTimeline } from '@/components/about/WorkTimeline';
import { SkillsBarSection } from '@/components/about/SkillsBar';
import { Certificates } from '@/components/about/Certificates';
import { AccentLine } from '@/components/ui/AccentLine';
import { CalendarIcon, BarChartIcon, StarIcon } from '@radix-ui/react-icons';

export default function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'de' | 'fr' | 'it' }> }) {
  const { locale } = React.use(params);
  const t = useTranslations('about');
  const about = content.about;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-4xl flex flex-col items-start">
        <h1 className="text-5xl font-serif font-normal mb-2 text-left pt-12">{about.title[locale]}</h1>
        <hr className="border-t border-gray-300 dark:border-gray-500 w-1/2 mb-12 ml-0" />
        
        {/* About Text Section */}
        <div className="w-full mb-32">
          <div>
            <p className="text-base text-muted-foreground mb-4 text-left">{about.aboutText[locale]}</p>
          </div>
        </div> 

        {/* Work Timeline */}
        <AccentLine 
          icon={<CalendarIcon width={24} height={24} className="w-6 h-6 text-accent dark:text-white" />} 
          title={t('workTimelineHeader')}
          className="w-full mb-32"
        >
          <WorkTimeline timeline={about.workTimeline} locale={locale} />
        </AccentLine>

        {/* Bare Skills Bar Diagram */}
        <AccentLine 
          icon={<BarChartIcon width={24} height={24} className="w-6 h-6 text-accent dark:text-white" />} 
          title={t('bareSkillsHeader')}
          className="w-full mb-32"
        >
          <SkillsBarSection skills={about.bareSkills} locale={locale} />
        </AccentLine>

        {/* Certificates Section */}
        <AccentLine 
          icon={<StarIcon width={24} height={24} className="w-6 h-6 text-accent dark:text-white" />} 
          title={t('certificatesHeader')}
          className="w-full mb-32"
        >
          <Certificates certificates={about.certificates} locale={locale} />
        </AccentLine>

        {/* Enhanced decorative element at the bottom */}
        <div className="w-full mt-8 sm:mt-12 pt-8 sm:pt-12 pb-8 sm:pb-12 text-center animate-in fade-in duration-1000 delay-500">
          <div className="inline-block w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full mb-3 sm:mb-4"></div>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            {t('endMessage')}
          </p>
        </div>
      </div>
    </main>
  );
} 