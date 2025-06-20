import React from 'react';

interface SkillsAndToolsItem {
  name: string;
  icon: string;
}

interface SkillsAndToolsCategory {
  key: string;
  label: Record<string, string>;
  items: SkillsAndToolsItem[];
}

interface SkillsAndToolsProps {
  categories: SkillsAndToolsCategory[];
  locale: string;
}

export function SkillsAndTools({ categories, locale }: SkillsAndToolsProps) {
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
  );
} 