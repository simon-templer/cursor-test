"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { useCallback } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

export function LanguageToggle() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = useCallback(async (locale: string) => {
    try {
      // Force a hard navigation to ensure proper locale change
      window.location.href = `/${locale}${pathname}`;
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [pathname]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors">
          <Globe className="h-5 w-5 text-[#009688] dark:text-white" />
          <span className="sr-only">{t('language.toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 