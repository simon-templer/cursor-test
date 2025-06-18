import React from 'react';

interface CapabilitiesProps {
  capabilities: Array<{
    icon: string;
    title: Record<string, string>;
    items: Record<string, string[]>;
  }>;
  t: (key: string, params?: Record<string, string>) => string;
  locale: string;
}

export function Capabilities({ capabilities, t, locale }: CapabilitiesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
      <div>
        <h2 className="text-4xl font-serif mb-8">{t('capabilitiesHeader')}</h2>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between gap-8">
        {capabilities.map((cap, idx) => (
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
  );
} 