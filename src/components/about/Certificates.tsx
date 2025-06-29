import React from 'react';

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
  const [hoveredCert, setHoveredCert] = React.useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer transition-all duration-300 transform ${
              hoveredCert === index ? 'scale-105' : 'hover:scale-102'
            }`}
            onMouseEnter={() => setHoveredCert(index)}
            onMouseLeave={() => setHoveredCert(null)}
          >
            {/* Certificate Card */}
            <div className="bg-card border border-border rounded-xl p-6 h-full shadow-sm hover:shadow-lg transition-all duration-300">
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

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
            </div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
          </div>
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