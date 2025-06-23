import React from 'react';

interface Certificate {
  name: Record<string, string>;
  issuer: Record<string, string>;
  date: string;
  icon: string;
  level: string;
  category: string;
}

interface CertificatesProps {
  certificates: Certificate[];
  locale: string;
}

export function Certificates({ certificates, locale }: CertificatesProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [hoveredCert, setHoveredCert] = React.useState<number | null>(null);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = [...new Set(certificates.map(cert => cert.category))];
    return ['All', ...cats];
  }, [certificates]);

  // Filter certificates by category
  const filteredCertificates = React.useMemo(() => {
    if (selectedCategory === 'All') return certificates;
    return certificates.filter(cert => cert.category === selectedCategory);
  }, [certificates, selectedCategory]);

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Advanced':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Intermediate':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-background shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert, index) => (
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
              {/* Icon and Level Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{cert.icon}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getLevelColor(cert.level)}`}>
                  {cert.level}
                </div>
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
                  {cert.category}
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
      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📜</div>
          <p className="text-muted-foreground">
            No certificates found for this category.
          </p>
        </div>
      )}
    </div>
  );
} 