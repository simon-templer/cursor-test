import React from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

interface Certificate {
  name: Record<string, string>;
  issuer: Record<string, string>;
  date: string;
  icon: string;
  category: Record<string, string>;
}

interface CertificatesProps {
  certificates: Certificate[];
  locale: string;
}

export function Certificates({ certificates, locale }: CertificatesProps) {
  return (
    <div className="w-full">
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <AnimatedCard
            key={index}
            index={index}
            className="h-full"
            showCornerDecoration={false}
          >
            {/* Icon */}
            <div className="flex items-start justify-start mb-4">
              <div className="text-4xl">{cert.icon}</div>
            </div>

            {/* Certificate Name */}
            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-200">
              {cert.name[locale]}
            </h3>

            {/* Issuer */}
            <p className="text-sm text-muted-foreground mb-3">
              {cert.issuer[locale]}
            </p>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {cert.date}
              </span>
              <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                {cert.category[locale]}
              </span>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📜</div>
          <p className="text-muted-foreground">
            No certificates found.
          </p>
        </div>
      )}
    </div>
  );
} 