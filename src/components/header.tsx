"use client";
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { LanguageToggle } from "./language-toggle"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link as IntlLink } from "@/i18n/navigation"

const navigation = [
  { name: "home", href: "/" },
  { name: "portfolio", href: "/portfolio" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
]

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('navigation');
  
  useEffect(() => { setMounted(true); }, []);
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-background bg-opacity-90 backdrop-blur">
      <div className="flex h-16 items-center w-full">
        <IntlLink href="/" className="flex items-center pl-4 sm:pl-8 lg:pl-12">
          {mounted ? (
            (theme === "dark" || (theme === "system" && resolvedTheme === "dark")) ? (
              <Image
                src="/images/konoto_logo_black_transparent.png"
                alt="KONOTO Logo Black"
                width={140}
                height={40}
                className="object-contain h-10 w-auto"
                priority
              />
            ) : (
              <Image
                src="/images/konoto_logo_green_transparent.png.png"
                alt="KONOTO Logo Green"
                width={140}
                height={40}
                className="object-contain h-10 w-auto"
                priority
              />
            )
          ) : null}
        </IntlLink>
        {/* Desktop Menu Button */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <LanguageToggle />
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-9 w-9 text-[#009688] dark:text-white" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full max-w-md h-full flex flex-col bg-background">
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              
              <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-8">
                {navigation.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="text-4xl font-light mb-2 hover:underline"
                    >
                      {t(item.name)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <LanguageToggle />
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="ml-auto px-0 text-base hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-9 w-9 text-[#009688] dark:text-white" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-full max-w-full h-full flex flex-col bg-background">
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <Link href="/" className="flex items-center">
                  <span className="font-bold text-lg">JOHN</span>
                </Link>
              </div>
              <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-8">
                {navigation.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="text-4xl font-light mb-2 hover:underline"
                    >
                      {t(item.name)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 