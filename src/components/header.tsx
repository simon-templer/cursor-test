"use client";
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

const socials = [
  { name: "Facebook", href: "#", color: "text-blue-400" },
  { name: "Github", href: "#", color: "text-white" },
  { name: "Twitter", href: "#", color: "text-blue-300" },
]

export function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex h-16 items-center w-full">
        <Link href="/" className="flex items-center pl-4 sm:pl-8 lg:pl-12">
          {mounted ? (
            theme === "dark" ? (
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
        </Link>
        {/* Desktop Menu Button */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="button-ghost-menu px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-9 w-9 text-[#009688] dark:text-white" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full max-w-md h-full flex flex-col bg-background">
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <Link href="/" className="flex items-center">
                  <span className="font-bold text-lg">JOHN</span>
                </Link>
              </div>
              <nav className="flex-1 flex flex-col items-start justify-center px-8 gap-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-4xl font-light mb-2 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex justify-between items-end w-full px-6 pb-4 text-sm">
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <Link key={social.name} href={social.href} className={social.color + " hover:underline"}>
                      {social.name}
                    </Link>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">copyright __ JOHN</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="button-ghost-menu ml-auto px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-4xl font-light mb-2 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex justify-between items-end w-full px-6 pb-4 text-sm">
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <Link key={social.name} href={social.href} className={social.color + " hover:underline"}>
                      {social.name}
                    </Link>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">copyright __ JOHN</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 