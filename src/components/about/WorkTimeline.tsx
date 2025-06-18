import React from 'react';

interface WorkTimelineProps {
  timeline: Array<{
    role: Record<string, string>;
    company: Record<string, string>;
    year: number;
  }>;
  t: (key: string, params?: Record<string, string>) => string;
  locale: string;
}

export function WorkTimeline({ timeline, t, locale }: WorkTimelineProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
      <div>
        <h2 className="text-3xl mb-8">{t('workTimelineHeader')}</h2>
      </div>
      <div className="w-full">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <tbody>
            {timeline.map((item, idx) => (
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
  );
} 