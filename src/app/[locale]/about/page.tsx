"use client";
import { content } from '@/config/content';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'de' | 'fr' | 'it' }> }) {
  const { locale } = React.use(params);
  const t = useTranslations('about');
  const about = content.about;

  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground transition-colors">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-24 p-8">
        {/* Header */}
        <div className="pt-8">
          <h1 className="text-5xl font-serif mb-2">{about.title[locale]}</h1>
          <hr className="border-t border-muted mb-8" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          <div>
            <h2 className="text-3xl mb-8">{t('workTimelineHeader')}</h2>
          </div>
          <div className="w-full">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <tbody>
                {about.workTimeline.map((item, idx) => (
                  <tr key={idx} className="border-b border-muted">
                    <td className="py-2 font-bold">{item.role[locale]}</td>
                    <td className="py-2">{item.company[locale]}</td>
                    <td className="py-2 text-right">{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
} 