import React, { useRef, useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  percent: number;
}

function SkillBar({ name, percent }: SkillBarProps) {
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

interface SkillsBarSectionProps {
  skills: Array<{
    name: Record<string, string>;
    percent: number;
  }>;
  locale: string;
}

export function SkillsBarSection({ skills, locale }: SkillsBarSectionProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 flex flex-col gap-8">
        {skills.map((skill, idx) => (
          <SkillBar
            key={idx}
            name={skill.name[locale]}
            percent={skill.percent}
          />
        ))}
      </div>
    </div>
  );
} 