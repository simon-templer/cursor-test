import React from 'react';

interface AccentLineProps {
  icon: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function AccentLine({ icon, title, children, className = '' }: AccentLineProps) {
  return (
    <div className={`flex flex-row items-stretch ${className}`}>
      {/* Icon at the top + vertical line */}
      <div className="relative flex flex-col items-center mr-6 min-w-[48px]">
        {/* Icon at the top */}
        <div className="z-10 w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-primary text-3xl shadow-md mb-2">
          {icon}
        </div>
        {/* Vertical accent line (starts below icon) */}
        <div className="flex-1 w-1 bg-primary/40" />
      </div>
      {/* Section content */}
      <div className="flex-1 flex flex-col justify-center">
        {title && <h2 className="text-4xl font-serif mb-8">{title}</h2>}
        {children}
      </div>
    </div>
  );
} 