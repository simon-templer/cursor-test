import React from 'react';

interface WorkTimelineProps {
  timeline: Array<{
    role: Record<string, string>;
    company: Record<string, string>;
    timeframe: Record<string, string>;
  }>;
  locale: string;
}

export function WorkTimeline({ timeline, locale }: WorkTimelineProps) {
  return (
    <div className="w-full flex justify-center">
      <table className="w-11/12 text-base border-separate border-spacing-y-2">
        <tbody>
          {timeline.map((item, idx) => (
            <tr key={idx} className="border-b border-muted">
              <td className="py-2 font-bold">{item.role[locale]}</td>
              <td className="py-2 text-center">{item.company[locale]}</td>
              <td className="py-2 text-right">{item.timeframe[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 