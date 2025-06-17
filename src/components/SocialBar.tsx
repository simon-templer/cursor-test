import React from 'react';
import { content } from '@/config/content';
import { Github, Linkedin } from 'lucide-react';
import { Button } from "./ui/button";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
};

export function SocialBar() {
  return (
    <>
      {/* Vertical bar for sm+ */}
      <div className="hidden sm:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 px-2 py-4 bg-transparent">
        {content.socials.map((social, idx) => (
          <Button
            key={idx}
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label.en}
              className="text-[#009688] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 rounded-full p-2 transition-colors [&>svg]:text-[#009688] dark:[&>svg]:text-white"
            >
              {iconMap[social.icon]}
            </a>
          </Button>
        ))}
        <div className="w-px h-16 bg-muted mt-4" />
        <span className="text-xs text-muted-foreground rotate-[-90deg] mt-4 select-none">Follow Me</span>
      </div>
      {/* Horizontal bar for mobile */}
      <div className="flex sm:hidden w-full flex-row items-center justify-center gap-2 px-4 py-8 bg-background/90 backdrop-blur mt-8">
        <span className="font-bold text-base text-foreground mr-2">Follow Me</span>
        <span className="inline-block w-8 h-0.5 bg-muted mr-2 align-middle" />
        {content.socials.map((social, idx) => (
          <Button
            key={idx}
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 mx-1"
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label.en}
              className="text-[#009688] dark:text-white hover:bg-accent/10 dark:hover:bg-accent/20 rounded-full p-2 transition-colors [&>svg]:text-[#009688] dark:[&>svg]:text-white"
            >
              {iconMap[social.icon]}
            </a>
          </Button>
        ))}
      </div>
    </>
  );
} 