import { Button } from "@/components/ui/button";
import { content } from "@/config/content";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from 'next-intl/server';
import { routing } from "@/i18n/routing";

type Locale = typeof routing.locales[number];

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params;
  const t = await getTranslations(); 
  
  return (
    <main className="h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="h-full w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full items-center">
          <div className="flex flex-col justify-center items-start h-full w-full pl-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {content.hero.name[locale]}
            </h1>
            <h2 className="text-2xl sm:text-3xl text-muted-foreground mb-4">
              {content.hero.title[locale]}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {content.hero.description[locale]}
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href={content.hero.resumeLink} download={content.hero.downloadFilename} target="_blank" rel="noopener noreferrer">
                  {t('home.downloadResume')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  {t('home.contactMe')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={content.hero.image}
              alt={t('home.heroImageAlt')}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
} 