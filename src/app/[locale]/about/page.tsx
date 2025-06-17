"use client";
import { content } from '@/config/content';
import { useTranslations } from 'next-intl';
import React, { useRef, useEffect, useState } from 'react';

// Types for Skills & Tools
interface SkillsAndToolsItem {
  name: string;
  icon: string;
}

interface SkillsAndToolsCategory {
  key: string;
  label: Record<string, string>;
  items: SkillsAndToolsItem[];
}

interface AboutContent {
  skillsAndTools: {
    categories: SkillsAndToolsCategory[];
  };
}

interface SkillsAndToolsSectionProps {
  about: AboutContent;
  t: (key: string, params?: Record<string, string>) => string;
  locale: string;
}

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
        {/* Bare Skills Bar Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          <div>
            <h2 className="text-4xl font-serif mb-8">{t('bareSkillsHeader')}</h2>
          </div>
          <div className="w-full flex flex-col gap-8">
            {about.bareSkills.map((skill, idx) => (
              <SkillBar
                key={idx}
                name={skill.name[locale]}
                percent={skill.percent}
              />
            ))}
          </div>
        </div>
        {/* Capabilities Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          <div>
            <h2 className="text-4xl font-serif mb-8">{t('capabilitiesHeader')}</h2>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between gap-8">
            {about.capabilities.map((cap, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center">
                <span className="text-5xl mb-2">{cap.icon}</span>
                <h3 className="text-2xl font-bold mb-2">{cap.title[locale]}</h3>
                <ul className="text-muted-foreground text-base space-y-1">
                  {cap.items[locale].map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Skills & Tools Section */}
        <SkillsAndToolsSection about={about} t={t} locale={locale} />
      </div>
    </main>
  );
}

// Animated SkillBar component
function SkillBar({ name, percent }: { name: string; percent: number }) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    const node = ref.current;
    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setWidth(percent), 200);
    }
  }, [visible, percent]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold">{name}</span>
        <span className="font-bold italic">{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-muted">
        <div
          className="h-1.5 bg-primary transition-all duration-1000"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// Skills & Tools Section with animated toggle
function SkillsAndToolsSection({ about, t, locale }: SkillsAndToolsSectionProps) {
  const categories = about.skillsAndTools.categories;
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [show, setShow] = React.useState(true);

  // Animate out, then switch, then animate in
  const handleToggle = (idx: number) => {
    if (idx === activeIdx) return;
    setShow(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setShow(true);
    }, 300);
  };

  const active = categories[activeIdx];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
      <div>
        <h2 className="text-4xl font-serif mb-8">{t('skillsAndToolsHeader')}</h2>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-4 mb-6">
          {categories.map((cat, idx) => (
            <button
              key={cat.key}
              className={`px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${idx === activeIdx ? 'bg-primary text-background' : 'bg-background text-foreground border-muted'}`}
              onClick={() => handleToggle(idx)}
              aria-pressed={idx === activeIdx}
            >
              {cat.label[locale]}
            </button>
          ))}
        </div>
        <div className="relative w-full min-h-[120px] flex items-center justify-center">
          <div
            className={`absolute w-full transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex flex-wrap justify-center gap-6`}
            key={active.key}
          >
            {active.items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-base font-medium text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 