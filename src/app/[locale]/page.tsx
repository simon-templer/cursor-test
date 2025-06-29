import { Button } from "@/components/ui/button";
import { content } from "@/config/content";
import { Link } from "@/i18n/navigation";
import { getTranslations } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { HeroImage } from "@/components/hero-image";

type Locale = typeof routing.locales[number];

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params;
  const t = await getTranslations(); 
  
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)] w-full items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center items-start h-full w-full px-6 sm:px-8 lg:px-12 py-8 lg:py-0 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
              {content.hero.name[locale]}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-4">
              {content.hero.title[locale]}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 max-w-2xl">
              {content.hero.description[locale]}
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t('home.contactMe')}
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image Section */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-full order-1 lg:order-2">
            <HeroImage src={content.hero.image} alt={t('home.heroImageAlt')} />
          </div>
        </div>
      </section>
    </main>
  );
} 