import React from 'react';

interface CapabilitiesProps {
  capabilities: Array<{
    icon: string;
    title: Record<string, string>;
    items: Record<string, string[]>;
  }>;
  locale: string;
}

export function Capabilities({ capabilities, locale }: CapabilitiesProps) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-8">
      {capabilities.map((cap, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center text-center max-w-xs">
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
  );
} 