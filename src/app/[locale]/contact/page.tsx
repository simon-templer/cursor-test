"use client";
import { useTranslations } from 'next-intl';
import { content } from '@/config/content';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

export default function ContactPage({ params }: { params: Promise<{ locale: 'en' | 'de' | 'fr' | 'it' }> }) {
  const { locale } = React.use(params);
  const t = useTranslations('contact');
  const contact = content.contactForm;
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(5, t('validation.nameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    message: z.string().min(20, t('validation.messageMin')),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success(t('success'));
        reset();
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
        <form className="flex-1 flex flex-col gap-4" aria-label="Contact form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                {...register('name')}
                type="text"
                placeholder={t('namePlaceholder')}
                className={cn(
                  "w-full p-3 bg-background border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200",
                  errors.name ? "border-destructive focus:ring-destructive" : "border-muted focus:ring-primary"
                )}
                aria-label={t('namePlaceholder')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                {...register('email')}
                type="email"
                placeholder={t('emailPlaceholder')}
                className={cn(
                  "w-full p-3 bg-background border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200",
                  errors.email ? "border-destructive focus:ring-destructive" : "border-muted focus:ring-primary"
                )}
                aria-label={t('emailPlaceholder')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <textarea
              {...register('message')}
              placeholder={t('messagePlaceholder')}
              className={cn(
                "w-full p-3 h-40 bg-background border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200",
                errors.message ? "border-destructive focus:ring-destructive" : "border-muted focus:ring-primary"
              )}
              aria-label={t('messagePlaceholder')}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>
          <div>
            <Button 
              type="submit" 
              className="px-8 py-2 transition-all duration-200 hover:scale-105" 
              disabled={loading || !isValid}
            >
              {loading ? '...' : t('send')}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
} 