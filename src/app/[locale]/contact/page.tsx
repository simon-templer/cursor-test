"use client";
import { useTranslations } from 'next-intl';
import { content } from '@/config/content';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import React, { useRef, useState } from 'react';

export default function ContactPage({ params }: { params: Promise<{ locale: 'en' | 'de' | 'fr' | 'it' }> }) {
  const { locale } = React.use(params);
  const t = useTranslations('contact');
  const contact = content.contactForm;
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success(t('success'));
        form.reset();
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors">
      <Toaster />
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 p-8">
        {/* Left: Contact Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-serif mb-8">{t('header')}</h1>
          <hr className="border-t border-muted mb-8" />
          <h2 className="text-3xl mb-4">{t('getInTouch')}</h2>
          <div className="mb-2 font-bold">{t('email')}: <a href={`mailto:${contact.email[locale]}`} className="underline text-primary">{contact.email[locale]}</a></div>
          <div className="mb-4 font-bold">{t('phone')}: <span className="font-normal">{contact.phone[locale]}</span></div>
          <p className="mb-4 text-base text-muted-foreground">{contact.description[locale]}</p>
        </div>
        {/* Right: Contact Form */}
        <form ref={formRef} className="flex-1 flex flex-col gap-4" aria-label="Contact form" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY} />
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder={t('namePlaceholder')}
              className="flex-1 p-3 bg-background border border-muted rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
              aria-label={t('namePlaceholder')}
            />
            <input
              type="email"
              name="email"
              placeholder={t('emailPlaceholder')}
              className="flex-1 p-3 bg-background border border-muted rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
              aria-label={t('emailPlaceholder')}
            />
          </div>
          <textarea
            name="message"
            placeholder={t('messagePlaceholder')}
            className="p-3 h-40 bg-background border border-muted rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
            aria-label={t('messagePlaceholder')}
          />
          <div>
            <Button type="submit" className="px-8 py-2" disabled={loading}>{loading ? '...' : t('send')}</Button>
          </div>
        </form>
      </div>
    </main>
  );
} 