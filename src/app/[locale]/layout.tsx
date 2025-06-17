import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { SocialBar } from "@/components/SocialBar";
import { exo2 } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio website",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning className={exo2.variable}>
      <body className={`${exo2.className} font-sans min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <div className="sm:ml-16 min-h-[calc(100vh-4rem)]">
              {children}
            </div>
            <SocialBar />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 