"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function FaviconUpdater() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const faviconId = "dynamic-favicon-konoto";
    const faviconHref =
      currentTheme === "dark"
        ? "/images/black_ikonoto_icon_only.svg"
        : "/images/green_ikonoto_icon_only.svg";

    // Only update or create our own favicon
    let link: HTMLLinkElement | null = document.querySelector(
      `link#${faviconId}`
    );
    if (!link) {
      link = document.createElement("link");
      link.id = faviconId;
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = faviconHref;
  }, [theme, resolvedTheme]);

  return null;
} 